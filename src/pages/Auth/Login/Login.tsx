import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { toast } from "react-toastify";

import { loginSchema } from "../../../Schema/loginSchema";
import type { LoginFormData } from "../../../Schema/loginSchema";
import { loginUser } from "../../../services/Auth/login.service";
import { useAuth } from "../../../context/useAuth";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await loginUser(data);

      console.log("Login success:", result.data);

      // Save user + token in AuthContext
      login(
        result.data.data.user,
        result.data.data.token
      );

      toast.success("Logged in successfully!");

      reset();

      navigate("/home");
    } catch (error) {
      console.log(error);

      if (axios.isAxiosError(error)) {
        console.log("Status:", error.response?.status);
        console.log("API Error:", error.response?.data);

        toast.error(
          error.response?.data?.message ||
            "Invalid email or password"
        );
      } else {
        toast.error(
          "Something went wrong. Please try again."
        );
      }
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF6EF] flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-110">

        {/* Card */}
        <div className="bg-white border border-[#EAE0D0] rounded-3xl p-6 sm:p-8 shadow-[0_15px_45px_rgba(43,42,40,0.08)]">

          {/* Logo */}
          <div className="flex flex-col items-center mb-8">

            <div
              className="w-12 h-12 rounded-xl bg-[#F05A5B] flex items-center justify-center mb-4"
              style={{
                boxShadow:
                  "0 8px 20px rgba(240,90,91,0.25)",
              }}
            >
              <div className="w-5 h-5 rounded-full border-[3px] border-white" />
            </div>

            <h1 className="text-2xl font-bold text-[#262522]">
              Welcome back
            </h1>

            <p className="text-sm text-[#A39C8A] mt-2 text-center">
              Sign in to continue to your account
            </p>

          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#262522] mb-2"
              >
                Email
              </label>

              <div className="relative">

                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A39C8A]"
                />

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...register("email")}
                  className="
                    w-full
                    h-12
                    pl-11
                    pr-4
                    rounded-xl
                    border
                    border-[#EAE0D0]
                    bg-[#FFF9F5]
                    text-[#262522]
                    text-sm
                    outline-none
                    placeholder:text-[#B8B0A0]
                    focus:border-[#F05A5B]
                    focus:ring-4
                    focus:ring-[#F05A5B]/10
                    transition
                  "
                />

              </div>

              {errors.email && (
                <p className="text-xs text-[#F05A5B] mt-1.5">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#262522] mb-2"
              >
                Password
              </label>

              <div className="relative">

                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A39C8A]"
                />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password")}
                  className="
                    w-full
                    h-12
                    pl-11
                    pr-12
                    rounded-xl
                    border
                    border-[#EAE0D0]
                    bg-[#FFF9F5]
                    text-[#262522]
                    text-sm
                    outline-none
                    placeholder:text-[#B8B0A0]
                    focus:border-[#F05A5B]
                    focus:ring-4
                    focus:ring-[#F05A5B]/10
                    transition
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    w-8
                    h-8
                    rounded-full
                    flex
                    items-center
                    justify-center
                    text-[#A39C8A]
                    hover:bg-[#FDECEB]
                    hover:text-[#F05A5B]
                    transition
                  "
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

              {errors.password && (
                <p className="text-xs text-[#F05A5B] mt-1.5">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="
                w-full
                h-12
                rounded-xl
                bg-[#F05A5B]
                text-white
                text-sm
                font-semibold
                flex
                items-center
                justify-center
                hover:opacity-90
                disabled:opacity-60
                disabled:cursor-not-allowed
                transition
              "
              style={{
                boxShadow:
                  "0 8px 20px rgba(240,90,91,0.25)",
              }}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                  Signing in...
                </div>
              ) : (
                "Sign in"
              )}
            </button>

          </form>

          {/* Register */}
          <p className="text-sm text-center text-[#A39C8A] mt-7">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-[#F05A5B] hover:underline"
            >
              Create account
            </Link>
          </p>

        </div>

      </div>

    </main>
  );
}