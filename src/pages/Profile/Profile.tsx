import {
  LockKeyhole,
  Mail,
  Pencil,
} from "lucide-react";

import { useQuery } from "@tanstack/react-query";

import { useAuth } from "../../context/useAuth";

import {
  getMyPosts,
  getMyProfile,
} from "../../services/Auth/profile.service";

import PostCard from "../../components/PostCard/PostCard";
import type { IPost } from "../../interface/Post.interface";
import { Link } from "react-router-dom";

export default function Profile() {
  const { token } = useAuth();

  // =========================
  // Get My Profile
  // =========================

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["my-profile"],

    queryFn: () => {
      if (!token) {
        throw new Error(
          "User is not authenticated"
        );
      }

      return getMyProfile(token);
    },

    enabled: Boolean(token),
  });

  const user = data?.data?.data?.user;

  // =========================
  // Get My Posts
  // =========================

  const postsQuery = useQuery({
    queryKey: ["my-posts", user?._id],

    queryFn: () => {
      if (!token || !user?._id) {
        throw new Error(
          "Missing user data"
        );
      }

      return getMyPosts(
        token,
        user._id
      );
    },

    enabled: Boolean(token && user?._id),
  });

  const myPosts =
    postsQuery.data?.data?.data?.posts ?? [];

  // =========================
  // Profile Loading
  // =========================

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#FAF6EF] flex items-center justify-center">
        <div className="flex items-center gap-3 text-[#A39C8A]">
          <div className="w-6 h-6 rounded-full border-2 border-[#FDECEB] border-t-[#F05A5B] animate-spin" />

          <span className="text-sm">
            Loading profile...
          </span>
        </div>
      </main>
    );
  }

  // =========================
  // Profile Error
  // =========================

  if (isError || !user) {
    return (
      <main className="min-h-screen bg-[#FAF6EF] flex items-center justify-center px-4">
        <div className="bg-white border border-[#EAE0D0] rounded-2xl px-7 py-8 text-center">
          <p className="font-semibold text-[#262522]">
            Failed to load profile
          </p>

          <p className="text-sm text-[#A39C8A] mt-1">
            Please try again later.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF6EF]">
      <div className="max-w-205 mx-auto px-4 py-6 md:py-8">

        {/* =========================
            Profile Card
        ========================= */}

        <section className="bg-white border border-[#EAE0D0] rounded-2xl overflow-hidden shadow-[0_10px_32px_rgba(43,42,40,0.07)]">

          {/* Cover */}

          <div className="relative h-36 md:h-44 overflow-hidden">

            {user.cover ? (
              <img
                src={user.cover}
                alt="Profile cover"
                className="
                  w-full
                  h-full
                  object-cover
                "
              />
            ) : (
              <div
                className="
                  w-full
                  h-full
                  bg-linear-to-r
                  from-[#F05A5B]
                  via-[#F77B59]
                  to-[#F6A15E]
                "
              />
            )}

            {/* Edit Cover */}

            <button
              type="button"
              className="
                absolute
                top-3
                right-3
                px-3
                py-1.5
                rounded-full
                bg-black/25
                backdrop-blur-md
                text-white
                text-[11px]
                font-medium
                flex
                items-center
                gap-1.5
                hover:bg-black/35
                transition
              "
            >
              <Pencil size={11} />
              Edit cover
            </button>

          </div>

          {/* Profile Content */}

          <div className="px-5 md:px-6 pb-5">

            {/* Avatar */}

            <div className="-mt-12 relative w-fit">

              <img
                src={user.photo}
                alt={user.name}
                className="
                  w-24
                  h-24
                  md:w-28
                  md:h-28
                  rounded-full
                  object-cover
                  border-4
                  border-white
                  ring-1
                  ring-[#EAE0D0]
                  bg-[#FDECEB]
                "
              />

              {/* Online */}

              <span
                className="
                  absolute
                  right-1
                  bottom-1
                  w-4
                  h-4
                  rounded-full
                  bg-[#2FA97C]
                  border-2
                  border-white
                "
              />

            </div>

            {/* Name + Password */}

            <div className="flex items-start justify-between gap-4 mt-2">

              <div className="min-w-0">

                <h1 className="text-lg md:text-xl font-bold text-[#262522]">
                  {user.name}

                  <span className="inline-flex ml-1 text-[#F05A5B]">
                    ●
                  </span>
                </h1>

                <div className="flex items-center gap-1.5 mt-0.5">

                  <Mail
                    size={11}
                    className="text-[#A39C8A]"
                  />

                  <p className="text-[11px] text-[#A39C8A] truncate">
                    {user.email}
                  </p>

                </div>

                <p className="text-[11px] text-[#A39C8A] mt-1">
                  @{user.username}
                </p>

              </div>

            <Link
  to="/change-password"
  className="
    shrink-0
    px-3
    py-1.5
    rounded-full
    border
    border-[#EAE0D0]
    bg-white
    text-[11px]
    font-medium
    text-[#6E685B]
    flex
    items-center
    gap-1.5
    hover:bg-[#FAF6EF]
    transition
  "
>
  <LockKeyhole size={11} />
  Password
</Link>

            </div>

            {/* Bio */}

            <p className="text-[11px] leading-5 text-[#6E685B] max-w-145 mt-4">
              Photographer & slow-living enthusiast.
              Sharing quiet corners, good coffee and
              everyday light.
            </p>

            {/* Stats */}

            <div className="grid grid-cols-3 gap-2.5 mt-5 max-w-97.5">

              {/* Posts */}

              <div className="bg-[#FAF6EF] border border-[#EAE0D0] rounded-xl px-3 py-2.5 text-center">

                <p className="text-sm font-bold text-[#262522]">
                  {myPosts.length}
                </p>

                <p className="text-[9px] text-[#A39C8A] mt-0.5">
                  Posts
                </p>

              </div>

              {/* Followers */}

              <div className="bg-[#FAF6EF] border border-[#EAE0D0] rounded-xl px-3 py-2.5 text-center">

                <p className="text-sm font-bold text-[#262522]">
                  {user.followersCount}
                </p>

                <p className="text-[9px] text-[#A39C8A] mt-0.5">
                  Followers
                </p>

              </div>

              {/* Following */}

              <div className="bg-[#FAF6EF] border border-[#EAE0D0] rounded-xl px-3 py-2.5 text-center">

                <p className="text-sm font-bold text-[#262522]">
                  {user.followingCount}
                </p>

                <p className="text-[9px] text-[#A39C8A] mt-0.5">
                  Following
                </p>

              </div>

            </div>

          </div>
        </section>

        {/* =========================
            Your Posts Header
        ========================= */}

        <div className="flex items-center justify-between mt-6 mb-3">

          <div className="flex items-center gap-2">

            <h2 className="text-sm font-bold text-[#262522]">
              Your posts
            </h2>

            <span className="px-1.5 py-0.5 rounded-full bg-white border border-[#EAE0D0] text-[9px] text-[#A39C8A]">
              {myPosts.length}
            </span>

          </div>

          <button
            type="button"
            className="
              px-3
              py-1.5
              rounded-full
              bg-white
              border
              border-[#EAE0D0]
              text-[10px]
              font-medium
              text-[#6E685B]
              hover:bg-[#FAF6EF]
              transition
            "
          >
            Newest
          </button>

        </div>

        {/* =========================
            Posts Loading
        ========================= */}

        {postsQuery.isLoading && (
          <div className="bg-white border border-[#EAE0D0] rounded-2xl p-8 flex items-center justify-center gap-3 shadow-[0_10px_32px_rgba(43,42,40,0.07)]">

            <div
              className="
                w-6
                h-6
                rounded-full
                border-2
                border-[#FDECEB]
                border-t-[#F05A5B]
                animate-spin
              "
            />

            <span className="text-sm text-[#A39C8A]">
              Loading your posts...
            </span>

          </div>
        )}

        {/* =========================
            Posts Error
        ========================= */}

        {!postsQuery.isLoading &&
          postsQuery.isError && (
            <div className="bg-white border border-[#EAE0D0] rounded-2xl p-8 text-center">

              <p className="text-sm font-medium text-[#262522]">
                Failed to load your posts
              </p>

              <p className="text-xs text-[#A39C8A] mt-1">
                Please try again later.
              </p>

            </div>
          )}

        {/* =========================
            No Posts
        ========================= */}

        {!postsQuery.isLoading &&
          !postsQuery.isError &&
          myPosts.length === 0 && (
            <div className="bg-white border border-[#EAE0D0] rounded-2xl p-8 text-center shadow-[0_10px_32px_rgba(43,42,40,0.07)]">

              <p className="text-sm font-medium text-[#262522]">
                No posts yet
              </p>

              <p className="text-xs text-[#A39C8A] mt-1">
                Your posts will appear here.
              </p>

            </div>
          )}

        {/* =========================
            My Posts
        ========================= */}

        {!postsQuery.isLoading &&
          !postsQuery.isError &&
          myPosts.length > 0 && (
            <div className="flex flex-col gap-5">

              {myPosts.map((post: IPost) => (
                <PostCard
                  key={post._id}
                  post={post}
                />
              ))}

            </div>
          )}

      </div>
    </main>
  );
}