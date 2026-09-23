import {
  LoaderCircle,
  Send,
} from "lucide-react";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  type FormEvent,
  useState,
} from "react";

import { toast } from "react-toastify";

import type { IComment } from "../../interface/Comment.interface";

import {
  createComment,
  getPostComments,
} from "../../services/Auth/posts.service";

import { useAuth } from "../../context/useAuth";

interface CommentsProps {
  postId: string;
  onCommentAdded: () => void;
}

function getCommentTime(date: string) {
  const createdAt = new Date(date);
  const now = new Date();

  const difference =
    now.getTime() - createdAt.getTime();

  const minutes = Math.floor(
    difference / (1000 * 60)
  );

  const hours = Math.floor(
    difference / (1000 * 60 * 60)
  );

  const days = Math.floor(
    difference / (1000 * 60 * 60 * 24)
  );

  if (minutes < 1) {
    return "just now";
  }

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  if (hours < 24) {
    return `${hours}h ago`;
  }

  if (days < 7) {
    return `${days}d ago`;
  }

  return createdAt.toLocaleDateString();
}

export default function Comments({
  postId,
  onCommentAdded,
}: CommentsProps) {
  const { token } = useAuth();

  const queryClient = useQueryClient();

  const [commentText, setCommentText] =
    useState("");

  // =========================
  // Get Comments
  // =========================

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["comments", postId],

    queryFn: () => {
      if (!token) {
        throw new Error(
          "User is not authenticated"
        );
      }

      return getPostComments(
        token,
        postId
      );
    },

    enabled: Boolean(token && postId),
  });

  const comments: IComment[] =
    data?.data?.data?.comments ?? [];

  // =========================
  // Add Comment
  // =========================

  const createCommentMutation =
    useMutation({
      mutationFn: () => {
        if (!token) {
          throw new Error(
            "User is not authenticated"
          );
        }

        return createComment(
          token,
          postId,
          commentText.trim()
        );
      },

      onSuccess: async () => {
        setCommentText("");

        await queryClient.invalidateQueries({
          queryKey: ["comments", postId],
        });

        onCommentAdded();

        toast.success(
          "Comment added successfully!"
        );
      },

      onError: (error) => {
        console.log(
          "Create comment error:",
          error
        );

        toast.error(
          "Failed to add comment"
        );
      },
    });

  // =========================
  // Submit
  // =========================

  const handleSubmit = (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!token) {
      toast.error("Please login first");
      return;
    }

    if (!commentText.trim()) {
      return;
    }

    if (createCommentMutation.isPending) {
      return;
    }

    createCommentMutation.mutate();
  };

  return (
    <div className="border-t border-[#EAE0D0] bg-[#FFFDF9]">

      {/* Header */}
      <div className="px-5 md:px-7 pt-5">
        <h3 className="text-sm font-semibold text-[#262522]">
          Comments
        </h3>
      </div>

      {/* Comments List */}
      <div className="px-5 md:px-7 py-4">

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center py-6">
            <LoaderCircle
              size={22}
              className="animate-spin text-[#F05A5B]"
            />

            <span className="ml-2 text-sm text-[#A39C8A]">
              Loading comments...
            </span>
          </div>
        )}

        {/* Error */}
        {!isLoading && isError && (
          <div className="py-6 text-center">
            <p className="text-sm font-medium text-[#262522]">
              Failed to load comments
            </p>

            <p className="text-xs text-[#A39C8A] mt-1">
              Please try again.
            </p>
          </div>
        )}

        {/* No Comments */}
        {!isLoading &&
          !isError &&
          comments.length === 0 && (
            <div className="py-6 text-center">
              <p className="text-sm font-medium text-[#6E685B]">
                No comments yet
              </p>

              <p className="text-xs text-[#A39C8A] mt-1">
                Be the first to comment.
              </p>
            </div>
          )}

        {/* Comments */}
        {!isLoading &&
          !isError &&
          comments.length > 0 && (
            <div className="flex flex-col gap-4">

              {comments.map((comment) => (
                <div
                  key={comment._id}
                  className="flex items-start gap-3"
                >

                  {/* Avatar */}
                  <img
                    src={
                      comment.commentCreator?.photo 
                      
                    }
                    alt={
                      comment.commentCreator?.name ||
                      "User"
                    }
                    className="
                      w-9
                      h-9
                      rounded-full
                      object-cover
                      ring-2
                      ring-[#F2E8D5]
                      shrink-0
                    "
                  />

                  {/* Comment Content */}
                  <div className="min-w-0 flex-1">

                    <div className="bg-white border border-[#EAE0D0] rounded-2xl px-4 py-3">

                      <div className="flex items-center gap-2">

                        <p className="text-sm font-semibold text-[#262522]">
                          {comment.commentCreator?.name ||
                            "User"}
                        </p>

                        <span className="text-[11px] text-[#A39C8A]">
                          @
                          {comment.commentCreator
                            ?.username ||
                            "user"}
                        </span>

                      </div>

                      <p className="text-sm text-[#6E685B] mt-1 leading-6">
                        {comment.content}
                      </p>

                    </div>

                    <p className="text-[11px] text-[#A39C8A] mt-1 ml-2">
                      {getCommentTime(
                        comment.createdAt
                      )}
                    </p>

                  </div>
                </div>
              ))}
            </div>
          )}

      </div>

      {/* Add Comment */}
      <form
        onSubmit={handleSubmit}
        className="px-5 md:px-7 pb-5"
      >
        <div className="flex items-center gap-2">

          <input
            type="text"
            value={commentText}
            onChange={(e) =>
              setCommentText(e.target.value)
            }
            placeholder="Write a comment..."
            disabled={
              createCommentMutation.isPending
            }
            className="
              flex-1
              min-w-0
              bg-white
              border
              border-[#EAE0D0]
              rounded-full
              px-4
              py-2.5
              text-sm
              text-[#262522]
              placeholder:text-[#A39C8A]
              outline-none
              focus:border-[#F05A5B]/50
              focus:ring-2
              focus:ring-[#F05A5B]/10
              transition
              disabled:opacity-60
            "
          />

          <button
            type="submit"
            disabled={
              createCommentMutation.isPending ||
              !commentText.trim()
            }
            className="
              w-10
              h-10
              rounded-full
              bg-[#F05A5B]
              text-white
              flex
              items-center
              justify-center
              shrink-0
              hover:opacity-90
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {createCommentMutation.isPending ? (
              <LoaderCircle
                size={17}
                className="animate-spin"
              />
            ) : (
              <Send
                size={16}
                strokeWidth={2.5}
              />
            )}
          </button>

        </div>
      </form>

    </div>
  );
}