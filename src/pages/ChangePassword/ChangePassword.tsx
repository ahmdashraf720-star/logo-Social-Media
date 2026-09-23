import {
  ArrowLeft,
  Check,
  Eye,
  EyeOff,
  KeyRound,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

import { useForm, useWatch } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { useNavigate } from "react-router-dom";

import { useState } from "react";

import axios from "axios";

import { toast } from "react-toastify";

import { changePassword } from "../../services/Auth/profile.service";

import {
  changePasswordSchema,
  type ChangePasswordFormData,
} from "../../Schema/changePasswordSchema";

import { useAuth } from "../../context/useAuth";

export default function ChangePassword() {
  const navigate = useNavigate();

  const { token, user } = useAuth();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  const [showNewPassword, setShowNewPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),

    defaultValues: {
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    },

    mode: "onBlur",
  });

  const newPassword = useWatch({
    control,
    name: "newPassword",
  });

  // =========================
  // Password Strength
  // =========================

  const getPasswordStrength = () => {
    if (!newPassword) {
      return {
        score: 0,
        label: "Weak",
      };
    }

    let score = 0;

    if (newPassword.length >= 8) {
      score++;
    }

    if (/[a-z]/.test(newPassword)) {
      score++;
    }

    if (/[A-Z]/.test(newPassword)) {
      score++;
    }

    if (/\d/.test(newPassword)) {
      score++;
    }

    if (/[@$!%*?&]/.test(newPassword)) {
      score++;
    }

    if (score <= 2) {
      return {
        score: 1,
        label: "Weak",
      };
    }

    if (score === 3) {
      return {
        score: 2,
        label: "Fair",
      };
    }

    if (score === 4) {
      return {
        score: 3,
        label: "Good",
      };
    }

    return {
      score: 4,
      label: "Strong",
    };
  };

  const passwordStrength = getPasswordStrength();

  // =========================
  // Submit
  // =========================

  const onSubmit = async (data: ChangePasswordFormData) => {
    if (!token) {
      toast.error("Please login first");
      return;
    }

    try {
      setIsSubmitting(true);

      await changePassword(token, {
        password: data.password,
        newPassword: data.newPassword,
      });

      toast.success("Password updated successfully!");

      setTimeout(() => {
        navigate("/profile");
      }, 600);
    } catch (error) {
      console.log("Change password error:", error);

      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
            error.response?.data?.errors ||
            "Failed to update password",
        );
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF6EF] flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-275">
        {/* =========================
            Top Icon
        ========================= */}

        <div className="flex flex-col items-center text-center">
          <div
            className="
              w-11
              h-11
              rounded-full
              bg-[#FDECEB]
              text-[#F05A5B]
              flex
              items-center
              justify-center
              mb-4
            "
          >
            <LockKeyhole size={19} />
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-[#262522]">
            Change password
          </h1>

          <p className="text-xs md:text-sm text-[#A39C8A] mt-1.5">
            Choose a strong password you have not used before.
          </p>

          {/* User */}
          {user && (
            <div
              className="
                mt-4
                flex
                items-center
                gap-2
                px-3
                py-1.5
                rounded-full
                bg-white
                border
                border-[#EAE0D0]
              "
            >
              <img
                src={
                  user.photo ||
                  "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png"
                }
                alt={user.name || "User"}
                className="
                  w-5
                  h-5
                  rounded-full
                  object-cover
                "
              />

              <span className="text-[10px] text-[#6E685B]">{user.email}</span>
            </div>
          )}
        </div>

        {/* =========================
            Form Card
        ========================= */}

        <div
          className="
            w-full
            max-w-95
            mx-auto
            mt-5
            bg-white
            border
            border-[#EAE0D0]
            rounded-2xl
            p-6
            md:p-7
            shadow-[0_18px_50px_rgba(43,42,40,0.07)]
          "
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* =========================
                Current Password
            ========================= */}

            <div>
              <label className="block text-[11px] font-medium text-[#262522] mb-1.5">
                Current Password
              </label>

              <div className="relative">
                <KeyRound
                  size={15}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-[#A39C8A]
                  "
                />

                <input
                  {...register("password")}
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="Enter current password"
                  disabled={isSubmitting}
                  className="
                    w-full
                    h-10
                    pl-9
                    pr-10
                    rounded-xl
                    border
                    border-[#EAE0D0]
                    bg-[#FFFDF9]
                    text-xs
                    text-[#262522]
                    placeholder:text-[#B2AA99]
                    outline-none
                    focus:border-[#F05A5B]/50
                    focus:ring-4
                    focus:ring-[#F05A5B]/10
                    transition
                  "
                />

                <button
                  type="button"
                  onClick={() => setShowCurrentPassword((prev) => !prev)}
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-[#A39C8A]
                    hover:text-[#262522]
                  "
                >
                  {showCurrentPassword ? (
                    <EyeOff size={15} />
                  ) : (
                    <Eye size={15} />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="text-[10px] text-[#D9484E] mt-1.5">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* =========================
                New Password
            ========================= */}

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-medium text-[#262522]">
                  New Password
                </label>

                <span className="text-[9px] text-[#A39C8A]">8+ characters</span>
              </div>

              <div className="relative">
                <LockKeyhole
                  size={15}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-[#A39C8A]
                  "
                />

                <input
                  {...register("newPassword")}
                  type={showNewPassword ? "text" : "password"}
                  placeholder="At least 8 characters"
                  disabled={isSubmitting}
                  className="
                    w-full
                    h-10
                    pl-9
                    pr-10
                    rounded-xl
                    border
                    border-[#EAE0D0]
                    bg-[#FFFDF9]
                    text-xs
                    text-[#262522]
                    placeholder:text-[#B2AA99]
                    outline-none
                    focus:border-[#F05A5B]/50
                    focus:ring-4
                    focus:ring-[#F05A5B]/10
                    transition
                  "
                />

                <button
                  type="button"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-[#A39C8A]
                    hover:text-[#262522]
                  "
                >
                  {showNewPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>

              {errors.newPassword && (
                <p className="text-[10px] text-[#D9484E] mt-1.5">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            {/* =========================
                Confirm Password
            ========================= */}

            <div>
              <label className="block text-[11px] font-medium text-[#262522] mb-1.5">
                Confirm New Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={15}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-[#A39C8A]
                  "
                />

                <input
                  {...register("confirmNewPassword")}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Repeat new password"
                  disabled={isSubmitting}
                  className="
                    w-full
                    h-10
                    pl-9
                    pr-10
                    rounded-xl
                    border
                    border-[#EAE0D0]
                    bg-[#FFFDF9]
                    text-xs
                    text-[#262522]
                    placeholder:text-[#B2AA99]
                    outline-none
                    focus:border-[#F05A5B]/50
                    focus:ring-4
                    focus:ring-[#F05A5B]/10
                    transition
                  "
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-[#A39C8A]
                    hover:text-[#262522]
                  "
                >
                  {showConfirmPassword ? (
                    <EyeOff size={15} />
                  ) : (
                    <Eye size={15} />
                  )}
                </button>
              </div>

              {errors.confirmNewPassword && (
                <p className="text-[10px] text-[#D9484E] mt-1.5">
                  {errors.confirmNewPassword.message}
                </p>
              )}
            </div>

            {/* =========================
                Password Strength
            ========================= */}

            <div className="pt-1">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] text-[#6E685B]">
                  Password strength
                </span>

                <span
                  className={`
                    text-[10px]
                    font-medium
                    ${
                      passwordStrength.score >= 3
                        ? "text-[#2FA97C]"
                        : "text-[#D9484E]"
                    }
                  `}
                >
                  {passwordStrength.label}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-1">
                {[1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`
                        h-1
                        rounded-full
                        ${
                          level <= passwordStrength.score
                            ? "bg-[#2FA97C]"
                            : "bg-[#EAE0D0]"
                        }
                      `}
                  />
                ))}
              </div>
            </div>

            {/* =========================
                Password Tip
            ========================= */}

            <div
              className="
                flex
                items-start
                gap-2
                bg-[#FFF9F5]
                border
                border-[#F2E8D5]
                rounded-xl
                p-3
              "
            >
              <ShieldCheck
                size={14}
                className="
                  text-[#F05A5B]
                  shrink-0
                  mt-0.5
                "
              />

              <p className="text-[9px] leading-4 text-[#6E685B]">
                Use 8+ characters with a mix of letters, numbers and symbols for
                best security.
              </p>
            </div>

            {/* =========================
                Update Button
            ========================= */}

            <button
              type="submit"
              disabled={isSubmitting}
              className="
                w-full
                h-10
                rounded-xl
                bg-[#F05A5B]
                text-white
                text-xs
                font-semibold
                flex
                items-center
                justify-center
                gap-2
                hover:opacity-90
                transition
                disabled:opacity-60
                disabled:cursor-not-allowed
                shadow-[0_8px_20px_rgba(240,90,91,0.22)]
              "
            >
              {isSubmitting ? (
                <>
                  <div
                    className="
                      w-4
                      h-4
                      rounded-full
                      border-2
                      border-white/40
                      border-t-white
                      animate-spin
                    "
                  />
                  Updating...
                </>
              ) : (
                <>
                  <Check size={14} />
                  Update Password
                </>
              )}
            </button>

            {/* =========================
                Back to Profile
            ========================= */}

            <button
              type="button"
              onClick={() => navigate("/profile")}
              disabled={isSubmitting}
              className="
                w-full
                flex
                items-center
                justify-center
                gap-1
                text-[10px]
                text-[#A39C8A]
                hover:text-[#262522]
                transition
                pt-1
              "
            >
              <ArrowLeft size={12} />
              Back to profile
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
