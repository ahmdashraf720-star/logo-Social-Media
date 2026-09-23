import {
  Bookmark,
  Heart,
  LoaderCircle,
  MessageCircle,
  MoreHorizontal,
  Pencil,
  Share2,
  Trash2,
} from "lucide-react";

import { useState } from "react";
import { toast } from "react-toastify";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import type { IPost } from "../../interface/Post.interface";

import {
  likePost,
  bookmarkPost,
  deletePost,
} from "../../services/Auth/posts.service";

import { useAuth } from "../../context/useAuth";

import Comments from "../Comments/Comments";
import EditPost from "../EditPost/EditPost";

interface PostCardProps {
  post: IPost;
}

function getPostTime(date: string) {
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

export default function PostCard({ post }: PostCardProps) {
  const { token, user } = useAuth();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // =========================
  // Menu / Edit / Delete
  // =========================

  const [showMenu, setShowMenu] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] =
    useState(false);

  const isOwner =
    user?._id === post.user._id;

  // =========================
  // Like State
  // =========================

  const [liked, setLiked] = useState(
    post.liked ??
      post.likes?.includes(user?._id ?? "")
  );

  const [likesCount, setLikesCount] = useState(
    post.likesCount
  );

  const [isLiking, setIsLiking] = useState(false);

  // =========================
  // Bookmark State
  // =========================

  const [bookmarked, setBookmarked] = useState(
    post.bookmarked ?? false
  );

  const [isBookmarking, setIsBookmarking] =
    useState(false);

  // =========================
  // Comments State
  // =========================

  const [showComments, setShowComments] =
    useState(false);

  const [commentsCount, setCommentsCount] =
    useState(post.commentsCount);

  // =========================
  // Like Handler
  // =========================

  const handleLike = async () => {
    if (!token || isLiking) {
      return;
    }

    try {
      setIsLiking(true);

      const response = await likePost(
        token,
        post._id
      );

      const data = response.data.data;

      setLiked(data.liked);
      setLikesCount(data.likesCount);
    } catch (error) {
      console.log("Like error:", error);

      toast.error(
        "Something went wrong. Please try again."
      );
    } finally {
      setIsLiking(false);
    }
  };

  // =========================
  // Bookmark Handler
  // =========================

  const handleBookmark = async () => {
    if (!token || isBookmarking) {
      return;
    }

    try {
      setIsBookmarking(true);

      const response = await bookmarkPost(
        token,
        post._id
      );

      const data = response.data.data;

      setBookmarked(data.bookmarked);

      if (data.bookmarked) {
        toast.success("Post saved!");
      } else {
        toast.success(
          "Post removed from bookmarks"
        );
      }
    } catch (error) {
      console.log(
        "Bookmark error:",
        error
      );

      toast.error(
        "Something went wrong. Please try again."
      );
    } finally {
      setIsBookmarking(false);
    }
  };

  // =========================
  // Delete Mutation
  // =========================

  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (!token) {
        throw new Error(
          "You are not authenticated"
        );
      }

      return deletePost(
        token,
        post._id
      );
    },

    onSuccess: async () => {
      toast.success(
        "Post deleted successfully!"
      );

      await queryClient.invalidateQueries({
        queryKey: ["posts"],
      });

      setShowDeleteConfirm(false);
    },

    onError: (error) => {
      console.log(
        "Delete post error:",
        error
      );

      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
            "Failed to delete post"
        );
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(
          "Something went wrong."
        );
      }
    },
  });

  return (
    <>
      <article className="bg-white rounded-2xl border border-[#EAE0D0] overflow-hidden shadow-[0_10px_32px_rgba(43,42,40,0.07)]">

        {/* =========================
            Clickable Post Content
        ========================= */}

        <div
          onClick={() =>
            navigate(`/post/${post._id}`)
          }
          className="cursor-pointer"
        >
          {/* Header */}

          <div className="p-5 md:p-7 pb-5">
            <div className="flex items-start justify-between gap-3">

              {/* User */}

              <div className="flex items-center gap-3.5 min-w-0">

                <img
                  src={post.user.photo}
                  alt={post.user.name}
                  className="
                    w-12
                    h-12
                    rounded-full
                    object-cover
                    ring-2
                    ring-[#F2E8D5]
                    shrink-0
                  "
                />

                <div className="min-w-0">

                  <p className="text-[15px] font-medium text-[#262522] truncate">
                    {post.user.name}
                  </p>

                  <p className="text-xs text-[#A39C8A] mt-0.5">
                    @{post.user.username}
                    {" · "}
                    {getPostTime(
                      post.createdAt
                    )}
                  </p>

                </div>
              </div>

            </div>

            {/* Body */}

            <p className="text-[15px] text-[#262522] leading-[1.7] mt-4 whitespace-pre-line">
              {post.body}
            </p>

          </div>

          {/* Image */}

          {post.image && (
            <div className="px-5 md:px-7">

              <img
                src={post.image}
                alt="Post"
                className="
                  w-full
                  h-60
                  md:h-85
                  object-cover
                  rounded-lg
                  border
                  border-[#EAE0D0]
                "
              />

            </div>
          )}
        </div>

        {/* =========================
            Actions
        ========================= */}

        <div className="px-5 md:px-7 py-5">

          <div className="flex items-center gap-2.5">

            {/* Like */}

            <button
              type="button"
              onClick={handleLike}
              disabled={isLiking}
              className={`
                flex
                items-center
                gap-2
                rounded-full
                px-4
                py-2
                text-sm
                font-medium
                border
                transition
                disabled:opacity-60

                ${
                  liked
                    ? "bg-[#FDECEB] border-[#F05A5B]/25 text-[#D9484E]"
                    : "bg-[#FAF6EF] border-[#EAE0D0] text-[#6E685B] hover:bg-[#FDECEB] hover:text-[#D9484E]"
                }
              `}
            >
              <Heart
                size={16}
                fill={
                  liked
                    ? "currentColor"
                    : "none"
                }
              />

              <span>{likesCount}</span>
            </button>

            {/* Comments */}

            <button
              type="button"
              onClick={() =>
                setShowComments(
                  (prev) => !prev
                )
              }
              className="
                flex
                items-center
                gap-2
                rounded-full
                px-4
                py-2
                text-sm
                font-medium
                bg-[#FAF6EF]
                border
                border-[#EAE0D0]
                text-[#6E685B]
                hover:bg-[#F2E8D5]
                transition
              "
            >
              <MessageCircle size={16} />

              <span>{commentsCount}</span>
            </button>

            {/* Share */}

            <button
              type="button"
              onClick={(event) =>
                event.stopPropagation()
              }
              className="
                flex
                items-center
                gap-2
                rounded-full
                px-4
                py-2
                text-sm
                font-medium
                bg-[#FAF6EF]
                border
                border-[#EAE0D0]
                text-[#6E685B]
                hover:bg-[#F2E8D5]
                transition
                ml-auto
              "
            >
              <Share2 size={15} />

              <span className="hidden sm:inline">
                Share
              </span>
            </button>

            {/* Bookmark */}

            <button
              type="button"
              onClick={handleBookmark}
              disabled={isBookmarking}
              title={
                bookmarked
                  ? "Remove bookmark"
                  : "Bookmark post"
              }
              className={`
                w-10
                h-10
                rounded-full
                flex
                items-center
                justify-center
                border
                transition
                disabled:opacity-60

                ${
                  bookmarked
                    ? "bg-[#FDECEB] text-[#F05A5B] border-[#F05A5B]/25"
                    : "bg-[#FAF6EF] text-[#6E685B] border-[#EAE0D0] hover:bg-[#FDECEB] hover:text-[#F05A5B]"
                }
              `}
            >
              <Bookmark
                size={16}
                fill={
                  bookmarked
                    ? "currentColor"
                    : "none"
                }
              />
            </button>

            {/* More */}

            {isOwner && (
              <div className="relative">

                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();

                    setShowMenu(
                      (prev) => !prev
                    );
                  }}
                  className="
                    w-10
                    h-10
                    rounded-full
                    flex
                    items-center
                    justify-center
                    border
                    border-[#EAE0D0]
                    bg-[#FAF6EF]
                    text-[#6E685B]
                    hover:bg-[#F2E8D5]
                    transition
                  "
                >
                  <MoreHorizontal size={18} />
                </button>

                {showMenu && (
                  <div
                    onClick={(event) =>
                      event.stopPropagation()
                    }
                    className="
                      absolute
                      right-0
                      bottom-12
                      z-30
                      w-40
                      bg-white
                      border
                      border-[#EAE0D0]
                      rounded-2xl
                      shadow-[0_12px_30px_rgba(43,42,40,0.12)]
                      p-1.5
                    "
                  >

                    {/* Edit */}

                    <button
                      type="button"
                      onClick={() => {
                        setShowMenu(false);
                        setShowEdit(true);
                      }}
                      className="
                        w-full
                        flex
                        items-center
                        gap-2.5
                        px-3
                        py-2.5
                        rounded-xl
                        text-sm
                        text-[#6E685B]
                        hover:bg-[#FAF6EF]
                        transition
                      "
                    >
                      <Pencil size={15} />
                      Edit
                    </button>

                    {/* Delete */}

                    <button
                      type="button"
                      onClick={() => {
                        setShowMenu(false);
                        setShowDeleteConfirm(true);
                      }}
                      className="
                        w-full
                        flex
                        items-center
                        gap-2.5
                        px-3
                        py-2.5
                        rounded-xl
                        text-sm
                        text-[#D9484E]
                        hover:bg-[#FDECEB]
                        transition
                      "
                    >
                      <Trash2 size={15} />
                      Delete
                    </button>

                  </div>
                )}

              </div>
            )}

          </div>
        </div>

        {/* =========================
            Comments
        ========================= */}

        {showComments && (
          <div onClick={(event) => event.stopPropagation()}>
            <Comments
              postId={post._id}
              onCommentAdded={() =>
                setCommentsCount(
                  (prev) => prev + 1
                )
              }
            />
          </div>
        )}

      </article>

      {/* =========================
          Edit Modal
      ========================= */}

      {showEdit && (
        <EditPost
          post={post}
          onClose={() =>
            setShowEdit(false)
          }
        />
      )}

      {/* =========================
          Delete Confirmation
      ========================= */}

      {showDeleteConfirm && (
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
        >
          <div
            className="
              w-full
              max-w-md
              bg-white
              rounded-3xl
              border
              border-[#EAE0D0]
              shadow-[0_25px_80px_rgba(43,42,40,0.18)]
              p-6
            "
          >

            <h2 className="text-lg font-bold text-[#262522]">
              Delete post?
            </h2>

            <p className="text-sm text-[#A39C8A] mt-2 leading-6">
              Are you sure you want to delete this
              post? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3 mt-6">

              <button
                type="button"
                onClick={() =>
                  setShowDeleteConfirm(false)
                }
                disabled={
                  deleteMutation.isPending
                }
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
                onClick={() =>
                  deleteMutation.mutate()
                }
                disabled={
                  deleteMutation.isPending
                }
                className="
                  px-5
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
                "
              >
                {deleteMutation.isPending ? (
                  <>
                    <LoaderCircle
                      size={16}
                      className="animate-spin"
                    />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={16} />
                    Delete
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