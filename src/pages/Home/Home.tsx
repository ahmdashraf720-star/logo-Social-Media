import { useQuery } from "@tanstack/react-query";
import CreatePost from "../../components/CreatePost/CreatePost";
import PostCard from "../../components/PostCard/PostCard";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import TipOfDay from "../../components/TipOfDay/TipOfDay";
import { getAllPosts } from "../../services/Auth/posts.service";
import { useAuth } from "../../context/useAuth";
import type { IPost } from "../../interface/Post.interface";

export default function Home() {
  const { token } = useAuth();

  const {
    data,
    isLoading: loading,
    isError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getAllPosts(token!),
    enabled: !!token,
  });

  const posts = data?.data.data.posts ?? [];

  return (
    <main className="min-h-screen bg-[#FAF6EF]">
      <div className="max-w-300 mx-auto py-6 md:py-10">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Feed */}
          <section className="w-full lg:w-212.5 flex flex-col gap-5 shrink-0 mx-auto">
            {/* Create Post */}
            <CreatePost />

            {/* Loading */}
            {loading && (
              <div className="bg-white rounded-2xl border border-[#EAE0D0] overflow-hidden shadow-[0_10px_32px_rgba(43,42,40,0.07)]">
                <div className="min-h-90 flex flex-col items-center justify-center px-6 py-10 text-center">
                  {/* Loader */}
                  <div className="relative w-24 h-24 mb-7">
                    {/* Outer Ring */}
                    <div className="absolute inset-0 rounded-full border-[5px] border-[#FDECEB]" />

                    {/* Spinning Ring */}
                    <div
                      className="
                        absolute
                        inset-0
                        rounded-full
                        border-[5px]
                        border-transparent
                        border-t-[#F05A5B]
                        animate-spin
                      "
                    />

                    {/* Center */}
                    <div className="absolute inset-3.5 rounded-full bg-[#FFF9F5] flex items-center justify-center">
                      <div className="w-10 h-10 rounded-xl bg-[#FDECEB] flex items-center justify-center">
                        <div className="w-5 h-5 rounded-full border-[3px] border-[#F05A5B]" />
                      </div>
                    </div>

                    {/* Decorative Dots */}
                    <span className="absolute -top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#FDECEB]" />

                    <span className="absolute bottom-1 -left-1 w-2 h-2 rounded-full bg-[#FDECEB]" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-[#262522] tracking-tight">
                    Loading posts...
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#A39C8A] mt-2 max-w-[320px] leading-6">
                    Just a moment — we're getting the latest posts for you.
                  </p>

                  {/* Dots */}
                  <div className="flex items-center gap-2 mt-6">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FDECEB]" />

                    <span
                      className="
                        w-2.5
                        h-2.5
                        rounded-full
                        bg-[#F05A5B]
                        animate-pulse
                      "
                    />

                    <span className="w-2.5 h-2.5 rounded-full bg-[#FDECEB]" />
                  </div>

                  {/* Bottom Message */}
                  <div className="mt-7 flex items-center gap-2 bg-[#FFF9F5] border border-[#F2E8D5] rounded-full px-5 py-2.5">
                    <span className="text-[#F05A5B] text-lg">✦</span>

                    <span className="text-sm font-medium text-[#6E685B]">
                      Good content is on the way
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Error */}
            {isError && !loading && (
              <div className="bg-white border border-[#EAE0D0] rounded-2xl p-8 text-center">
                <p className="text-[#262522] font-medium">
                  Something went wrong
                </p>

                <p className="text-sm text-[#A39C8A] mt-1">
                  We couldn't load the posts. Please try again.
                </p>
              </div>
            )}

            {/* Posts */}
            {!loading &&
              !isError &&
              posts.length > 0 &&
              posts.map((post: IPost) => <PostCard key={post._id} post={post} />)}

            {/* No Posts */}
            {!loading && !isError && posts.length === 0 && (
              <div className="bg-white border border-[#EAE0D0] rounded-2xl p-8 text-center">
                <p className="text-[#262522] font-medium">No posts found</p>

                <p className="text-sm text-[#A39C8A] mt-1">
                  Be the first one to create a post.
                </p>
              </div>
            )}
          </section>

          {/* Sidebar */}
          <div className="w-full lg:w-100 lg:sticky lg:top-5 self-start flex flex-col gap-6">
            <ProfileCard />
            <TipOfDay />
          </div>
        </div>
      </div>
    </main>
  );
}
