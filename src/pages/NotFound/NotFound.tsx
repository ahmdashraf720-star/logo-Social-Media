
import {
  ArrowLeft,
  Home,
  SearchX,
} from "lucide-react";

import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#FAF6EF] flex items-center justify-center px-4">

      <div className="w-full max-w-xl text-center">

        {/* Icon */}
        <div className="relative mx-auto w-24 h-24 mb-7">

          <div
            className="
              absolute
              inset-0
              rounded-full
              bg-[#FDECEB]
              animate-pulse
            "
          />

          <div
            className="
              relative
              w-24
              h-24
              rounded-full
              bg-white
              border
              border-[#EAE0D0]
              shadow-[0_15px_40px_rgba(43,42,40,0.08)]
              flex
              items-center
              justify-center
            "
          >
            <SearchX
              size={38}
              strokeWidth={1.7}
              className="text-[#F05A5B]"
            />
          </div>

          {/* Decorative dots */}
          <span className="absolute -top-1 right-1 w-3 h-3 rounded-full bg-[#F6A15E]" />
          <span className="absolute bottom-2 -left-2 w-2.5 h-2.5 rounded-full bg-[#FDECEB]" />

        </div>

        {/* 404 */}
        <p className="text-7xl md:text-8xl font-black tracking-tight text-[#262522]/10">
          404
        </p>

        <h1 className="text-2xl md:text-3xl font-bold text-[#262522] -mt-3">
          Page not found
        </h1>

        <p className="text-sm md:text-base text-[#A39C8A] mt-3 max-w-md mx-auto leading-6">
          The page you're looking for doesn't exist or
          may have been moved to another place.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-7">

          {/* Home */}
          <Link
            to="/home"
            className="
              w-full
              sm:w-auto
              px-6
              py-3
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
              shadow-[0_8px_20px_rgba(240,90,91,0.22)]
            "
          >
            <Home size={16} />
            Go to Home
          </Link>

          {/* Back */}
          <button
            type="button"
            onClick={() => window.history.back()}
            className="
              w-full
              sm:w-auto
              px-6
              py-3
              rounded-full
              bg-white
              border
              border-[#EAE0D0]
              text-[#6E685B]
              text-sm
              font-medium
              flex
              items-center
              justify-center
              gap-2
              hover:bg-[#FFF9F5]
              transition
            "
          >
            <ArrowLeft size={16} />
            Go back
          </button>

        </div>

        {/* Brand */}
        <div className="flex items-center justify-center gap-2 mt-10">

          <div
            className="
              w-7
              h-7
              rounded-md
              bg-[#F05A5B]
              flex
              items-center
              justify-center
            "
          >
            <div className="w-2.5 h-2.5 rounded-full border-2 border-white" />
          </div>

          <span className="font-bold text-[#262522]">
            logo
          </span>

        </div>

      </div>
    </main>
  );
}