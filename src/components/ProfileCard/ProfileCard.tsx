import { ArrowRight, LoaderCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { useAuth } from "../../context/useAuth";

import {
  getMyPosts,
  getMyProfile,
} from "../../services/Auth/profile.service";

export default function ProfileCard() {
  const { token } = useAuth();

  // =========================
  // Profile
  // =========================

  const {
    data: profileData,
    isLoading: profileLoading,
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

  const user =
    profileData?.data?.data?.user;

  // =========================
  // My Posts
  // =========================

  const {
    data: postsData,
    isLoading: postsLoading,
  } = useQuery({
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

    enabled: Boolean(
      token && user?._id
    ),
  });

  const posts =
    postsData?.data?.data?.posts ?? [];

  // =========================
  // Loading
  // =========================

  if (profileLoading) {
    return (
      <div
        className="
          bg-white
          border
          border-[#EAE0D0]
          rounded-2xl
          p-6
          min-h-60
          flex
          items-center
          justify-center
          shadow-[0_10px_32px_rgba(43,42,40,0.07)]
        "
      >
        <LoaderCircle
          size={23}
          className="animate-spin text-[#F05A5B]"
        />
      </div>
    );
  }

  // =========================
  // No User
  // =========================

  if (!user) {
    return null;
  }

  return (
    <div
      className="
        bg-white
        border
        border-[#EAE0D0]
        rounded-2xl
        p-5
        shadow-[0_10px_32px_rgba(43,42,40,0.07)]
      "
    >

      {/* =========================
          Header
      ========================= */}

      <div className="flex items-center justify-between">

        <h3 className="text-sm font-semibold text-[#262522]">
          Your profile
        </h3>

        <span
          className="
            w-2
            h-2
            rounded-full
            bg-[#2FA97C]
          "
        />

      </div>

      {/* =========================
          User
      ========================= */}

      <div className="flex items-center gap-3 mt-4">

        <img
          src={user.photo}
          alt={user.name}
          className="
            w-11
            h-11
            rounded-full
            object-cover
            ring-2
            ring-[#F2E8D5]
            shrink-0
          "
        />

        <div className="min-w-0">

          <p className="text-sm font-semibold text-[#262522] truncate">
            {user.name}
          </p>

          <p className="text-xs text-[#A39C8A] mt-0.5 truncate">
            {user.email}
          </p>

        </div>

      </div>

      {/* =========================
          Stats
      ========================= */}

      <div className="grid grid-cols-3 gap-2 mt-4">

        {/* Posts */}

        <div
          className="
            bg-[#FAF6EF]
            border
            border-[#EAE0D0]
            rounded-xl
            px-2
            py-3
            text-center
          "
        >
          <p className="text-sm font-bold text-[#262522]">
            {postsLoading ? (
              <span className="inline-block w-3 h-3 border-2 border-[#FDECEB] border-t-[#F05A5B] rounded-full animate-spin" />
            ) : (
              posts.length
            )}
          </p>

          <p className="text-[10px] text-[#A39C8A] mt-0.5">
            posts
          </p>
        </div>

        {/* Followers */}

        <div
          className="
            bg-[#FAF6EF]
            border
            border-[#EAE0D0]
            rounded-xl
            px-2
            py-3
            text-center
          "
        >
          <p className="text-sm font-bold text-[#262522]">
            {user.followersCount}
          </p>

          <p className="text-[10px] text-[#A39C8A] mt-0.5">
            followers
          </p>
        </div>

        {/* Following */}

        <div
          className="
            bg-[#FAF6EF]
            border
            border-[#EAE0D0]
            rounded-xl
            px-2
            py-3
            text-center
          "
        >
          <p className="text-sm font-bold text-[#262522]">
            {user.followingCount}
          </p>

          <p className="text-[10px] text-[#A39C8A] mt-0.5">
            following
          </p>
        </div>

      </div>

      {/* =========================
          View Profile
      ========================= */}

      <Link
        to="/profile"
        className="
          mt-4
          w-full
          h-10
          rounded-full
          bg-[#262522]
          text-white
          text-sm
          font-medium
          flex
          items-center
          justify-center
          gap-2
          hover:opacity-90
          transition
        "
      >
        View profile

        <ArrowRight size={15} />
      </Link>

    </div>
  );
}