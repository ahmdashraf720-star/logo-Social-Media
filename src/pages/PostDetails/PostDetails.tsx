

import { ArrowLeft, LoaderCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import { getSinglePost } from "../../services/Auth/posts.service";
import { useAuth } from "../../context/useAuth";

import PostCard from "../../components/PostCard/PostCard";

export default function PostDetails() {
  const { id } = useParams<{ id: string }>();

  const { token } = useAuth();

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["post", id],

    queryFn: () => {
      if (!token || !id) {
        throw new Error(
          "Missing authentication or post ID"
        );
      }

      return getSinglePost(token, id);
    },

    enabled: Boolean(token && id),
  });

  const post = data?.data?.data?.post;

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#FAF6EF] flex items-center justify-center">
        <div className="flex items-center gap-3 text-[#A39C8A]">
          <LoaderCircle
            size={24}
            className="animate-spin text-[#F05A5B]"
          />

          <span className="text-sm">
            Loading post...
          </span>
        </div>
      </main>
    );
  }

  if (isError || !post) {
    return (
      <main className="min-h-screen bg-[#FAF6EF] flex items-center justify-center px-4">

        <div className="bg-white border border-[#EAE0D0] rounded-3xl p-8 text-center max-w-md">

          <h1 className="text-xl font-bold text-[#262522]">
            Post not found
          </h1>

          <p className="text-sm text-[#A39C8A] mt-2">
            We couldn't load this post.
          </p>

          <Link
            to="/home"
            className="
              inline-flex
              items-center
              gap-2
              mt-5
              px-5
              py-2.5
              rounded-full
              bg-[#F05A5B]
              text-white
              text-sm
              font-medium
              hover:opacity-90
              transition
            "
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF6EF]">
      <div className="max-w-180 mx-auto px-4 py-6 md:py-10">

        {/* Back */}
        <Link
          to="/home"
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            font-medium
            text-[#6E685B]
            hover:text-[#F05A5B]
            transition
            mb-5
          "
        >
          <ArrowLeft size={17} />
          Back to Home
        </Link>

        {/* Post */}
        <PostCard post={post} />

      </div>
    </main>
  );
}