
import { Lightbulb } from "lucide-react";

export default function TipOfDay() {
  return (
    <div
      className="
        sticky-top
        relative
        overflow-hidden
        bg-[#262522]
        rounded-2xl
        p-5
        text-white
        shadow-[0_10px_32px_rgba(43,42,40,0.12)]
      "
    >
      {/* Decorative circle */}
      <div
        className="
          absolute
          -right-8
          -bottom-8
          w-28
          h-28
          rounded-full
          border
          border-white/10
        "
      />

      <div className="relative z-10">
        <div className="flex items-center gap-2">
          <Lightbulb
            size={16}
            className="text-[#FDECEB]"
          />

          <h3 className="text-sm font-semibold">
            Tip of the day
          </h3>
        </div>

        <p className="text-xs text-white/65 leading-5 mt-3">
          Posts with photos get 3x more likes.
          Share a moment from today.
        </p>
      </div>
    </div>
  );
}