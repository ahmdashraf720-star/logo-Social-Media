import { useState } from "react";
import { ImagePlus, Plus, X, Loader2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";

import { useAuth } from "../../context/useAuth";
import { createPost } from "../../services/Auth/posts.service";

export default function CreatePost() {
  const { user, token } = useAuth();

  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);
  const [body, setBody] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const createPostMutation = useMutation({
    mutationFn: async () => {
      if (!token) {
        throw new Error("You are not authenticated");
      }

      if (!body.trim()) {
        throw new Error("Post content is required");
      }

      const formData = new FormData();

      formData.append("body", body.trim());

      if (image) {
        formData.append("image", image);
      }

      return createPost(token, formData);
    },

    onSuccess: () => {
      toast.success("Post created successfully!");

      setBody("");
      setImage(null);
      setIsOpen(false);

      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },

    onError: (error) => {
      console.log("Create post error:", error);

      if (axios.isAxiosError(error)) {
        console.log("API Error:", error.response?.data);

        toast.error(
          error.response?.data?.message ||
            "Failed to create post"
        );
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    },
  });

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setImage(file);
  };

  const handleSubmit = () => {
    createPostMutation.mutate();
  };

  const closeModal = () => {
    if (createPostMutation.isPending) {
      return;
    }

    setIsOpen(false);
    setBody("");
    setImage(null);
  };

  return (
    <>
      {/* Create Post Box */}
      <div
        className="
          bg-white
          rounded-2xl
          border border-[#EAE0D0]
          p-4
          flex
          items-center
          gap-3
          shadow-[0_10px_32px_rgba(43,42,40,0.07)]
        "
      >
        {/* User Avatar */}
        {user?.photo ? (
          <img
            src={user.photo}
            alt={user.username}
            className="
              w-10
              h-10
              rounded-full
              object-cover
              shrink-0
              ring-2
              ring-[#FDECEB]
            "
          />
        ) : (
          <div
            className="
              w-10
              h-10
              rounded-full
              bg-[#FDECEB]
              text-[#D9484E]
              flex
              items-center
              justify-center
              font-semibold
              shrink-0
            "
          >
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
        )}

        {/* Input Trigger */}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="
            flex-1
            min-w-0
            bg-[#FAF6EF]
            border border-[#EAE0D0]
            rounded-full
            px-3
            py-3
            text-sm
            text-[#A39C8A]
            text-left
            hover:border-[#F05A5B]/40
            transition
          "
        >
          Share something today...
        </button>

        {/* Post Button */}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="
            h-11
            px-5
            rounded-full
            bg-[#F05A5B]
            text-white
            text-sm
            font-medium
            flex
            items-center
            justify-center
            gap-1.5
            shrink-0
            hover:opacity-90
            transition
          "
          style={{
            boxShadow:
              "0 8px 20px rgba(240, 90, 91, 0.32)",
          }}
        >
          <Plus size={15} strokeWidth={3} />

          <span className="hidden sm:inline">
            Post
          </span>
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          className="
            fixed
            inset-0
            z-50
            bg-black/40
            backdrop-blur-sm
            flex
            items-center
            justify-center
            p-4
          "
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <div
            className="
              w-full
              max-w-xl
              bg-white
              rounded-3xl
              border border-[#EAE0D0]
              shadow-[0_25px_80px_rgba(43,42,40,0.18)]
              overflow-hidden
            "
          >
            {/* Header */}
            <div
              className="
                flex
                items-center
                justify-between
                px-6
                py-5
                border-b
                border-[#EAE0D0]
              "
            >
              <div>
                <h2 className="text-lg font-bold text-[#262522]">
                  Create a post
                </h2>

                <p className="text-sm text-[#A39C8A] mt-1">
                  Share something with your community
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={createPostMutation.isPending}
                className="
                  w-9
                  h-9
                  rounded-full
                  bg-[#FAF6EF]
                  text-[#6E685B]
                  flex
                  items-center
                  justify-center
                  hover:bg-[#FDECEB]
                  hover:text-[#F05A5B]
                  transition
                  disabled:opacity-50
                "
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              {/* User */}
              <div className="flex items-center gap-3 mb-5">
                {user?.photo ? (
                  <img
                    src={user.photo}
                    alt={user.username}
                    className="
                      w-11
                      h-11
                      rounded-full
                      object-cover
                    "
                  />
                ) : (
                  <div
                    className="
                      w-11
                      h-11
                      rounded-full
                      bg-[#FDECEB]
                      text-[#D9484E]
                      flex
                      items-center
                      justify-center
                      font-semibold
                    "
                  >
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}

                <div>
                  <p className="text-sm font-semibold text-[#262522]">
                    {user?.name || "User"}
                  </p>

                  <p className="text-xs text-[#A39C8A]">
                    @{user?.username || "username"}
                  </p>
                </div>
              </div>

              {/* Textarea */}
              <textarea
                value={body}
                onChange={(event) => setBody(event.target.value)}
                placeholder="What's on your mind?"
                rows={5}
                disabled={createPostMutation.isPending}
                className="
                  w-full
                  h-25
                  resize-none
                  bg-[#FAF6EF]
                  border border-[#EAE0D0]
                  rounded-2xl
                  p-4
                  text-sm
                  text-[#262522]
                  placeholder:text-[#A39C8A]
                  outline-none
                  focus:border-[#F05A5B]/50
                  focus:ring-4
                  focus:ring-[#F05A5B]/10
                  transition
                  disabled:opacity-60
                "
              />

              {/* Image */}
              <div className="mt-4">
                <label
                  className="
                    flex
                    items-center
                    gap-3
                    w-full
                    border
                    border-dashed
                    border-[#EAE0D0]
                    bg-[#FFF9F5]
                    rounded-2xl
                    px-4
                    py-4
                    cursor-pointer
                    hover:border-[#F05A5B]/50
                    hover:bg-[#FDECEB]/40
                    transition
                  "
                >
                  <div
                    className="
                      w-10
                      h-10
                      rounded-xl
                      bg-[#FDECEB]
                      text-[#F05A5B]
                      flex
                      items-center
                      justify-center
                      shrink-0
                    "
                  >
                    <ImagePlus size={19} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#262522]">
                      {image
                        ? image.name
                        : "Add an image"}
                    </p>

                    <p className="text-xs text-[#A39C8A] mt-0.5">
                      Choose a photo from your device
                    </p>
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={createPostMutation.isPending}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Selected Image */}
              {image && (
                <div className="mt-4 relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="
                      w-full
                      max-h-50
                      object-cover
                      rounded-2xl
                      border
                      border-[#EAE0D0]
                    "
                  />

                  <button
                    type="button"
                    onClick={() => setImage(null)}
                    disabled={createPostMutation.isPending}
                    className="
                      absolute
                      top-3
                      right-3
                      w-9
                      h-9
                      rounded-full
                      bg-black/60
                      text-white
                      flex
                      items-center
                      justify-center
                      hover:bg-black/75
                      transition
                    "
                  >
                    <X size={17} />
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            <div
              className="
                px-6
                py-4
                border-t
                border-[#EAE0D0]
                flex
                items-center
                justify-end
                gap-3
              "
            >
              <button
                type="button"
                onClick={closeModal}
                disabled={createPostMutation.isPending}
                className="
                  px-5
                  py-2.5
                  rounded-full
                  border
                  border-[#EAE0D0]
                  bg-white
                  text-sm
                  font-medium
                  text-[#6E685B]
                  hover:bg-[#FAF6EF]
                  transition
                  disabled:opacity-50
                "
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={
                  createPostMutation.isPending ||
                  !body.trim()
                }
                className="
                  px-6
                  py-2.5
                  rounded-full
                  bg-[#F05A5B]
                  text-white
                  text-sm
                  font-medium
                  flex
                  items-center
                  justify-center
                  gap-2
                  hover:opacity-90
                  transition
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
                style={{
                  boxShadow:
                    "0 8px 20px rgba(240, 90, 91, 0.25)",
                }}
              >
                {createPostMutation.isPending ? (
                  <>
                    <Loader2
                      size={16}
                      className="animate-spin"
                    />

                    Publishing...
                  </>
                ) : (
                  <>
                    <Plus
                      size={16}
                      strokeWidth={3}
                    />

                    Publish Post
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}