import {
  ImagePlus,
  LoaderCircle,
  X,
} from "lucide-react";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {  useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import type { IPost } from "../../interface/Post.interface";
import { updatePost } from "../../services/Auth/posts.service";
import { useAuth } from "../../context/useAuth";

interface EditPostProps {
  post: IPost;
  onClose: () => void;
}

export default function EditPost({
  post,
  onClose,
}: EditPostProps) {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const [body, setBody] = useState(post.body);
  const [image, setImage] = useState<File | null>(
    null
  );

  const updateMutation = useMutation({
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

      return updatePost(
        token,
        post._id,
        formData
      );
    },

    onSuccess: async () => {
      toast.success("Post updated successfully!");

      await queryClient.invalidateQueries({
        queryKey: ["posts"],
      });

      onClose();
    },

    onError: (error) => {
      console.log("Update post error:", error);

      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
            "Failed to update post"
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

  return (
    <div
      className="
        fixed
        inset-0
        z-100
        bg-black/40
        backdrop-blur-sm
        flex
        items-center
        justify-center
        p-4
      "
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          if (!updateMutation.isPending) {
            onClose();
          }
        }
      }}
    >
      <div
        className="
          w-full
          max-w-xl
          bg-white
          rounded-3xl
          border
          border-[#EAE0D0]
          shadow-[0_25px_80px_rgba(43,42,40,0.18)]
          overflow-hidden
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#EAE0D0]">
          <div>
            <h2 className="text-lg font-bold text-[#262522]">
              Edit post
            </h2>

            <p className="text-sm text-[#A39C8A] mt-1">
              Update your post
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={updateMutation.isPending}
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
            "
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">

          <textarea
            value={body}
            onChange={(event) =>
              setBody(event.target.value)
            }
            rows={6}
            disabled={updateMutation.isPending}
            placeholder="Write your post..."
            className="
              w-full
              resize-none
              bg-[#FAF6EF]
              border
              border-[#EAE0D0]
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
            "
          />

          {/* Image */}
          <label
            className="
              mt-4
              flex
              items-center
              gap-3
              border
              border-dashed
              border-[#EAE0D0]
              bg-[#FFF9F5]
              rounded-2xl
              px-4
              py-4
              cursor-pointer
              hover:border-[#F05A5B]/50
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
              "
            >
              <ImagePlus size={19} />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-medium text-[#262522]">
                {image
                  ? image.name
                  : "Change image"}
              </p>

              <p className="text-xs text-[#A39C8A] mt-0.5">
                Select a new image
              </p>
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={updateMutation.isPending}
              className="hidden"
            />
          </label>

          {/* New Image Preview */}
          {image && (
            <div className="relative mt-4">
              <img
                src={URL.createObjectURL(image)}
                alt="New post"
                className="
                  w-full
                  max-h-72
                  object-cover
                  rounded-2xl
                  border
                  border-[#EAE0D0]
                "
              />

              <button
                type="button"
                onClick={() => setImage(null)}
                disabled={updateMutation.isPending}
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
                "
              >
                <X size={17} />
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#EAE0D0] flex justify-end gap-3">

          <button
            type="button"
            onClick={onClose}
            disabled={updateMutation.isPending}
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
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() =>
              updateMutation.mutate()
            }
            disabled={
              updateMutation.isPending ||
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
              gap-2
              hover:opacity-90
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {updateMutation.isPending ? (
              <>
                <LoaderCircle
                  size={16}
                  className="animate-spin"
                />
                Updating...
              </>
            ) : (
              "Update Post"
            )}
          </button>

        </div>
      </div>
    </div>
  );
}