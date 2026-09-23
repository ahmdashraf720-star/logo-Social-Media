import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import { User, AtSign, Mail, Calendar, Lock, Eye, EyeOff } from "lucide-react";
import {
  registerSchema,
  type RegisterFormData,
} from "../../../Schema/registerSchema";

import { sendData } from "../../../services/Auth/register.service";


// ==========================================
// Component
// ==========================================

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const Navigate =useNavigate()


const {
  register,
  handleSubmit,
  reset,
  formState: { errors },
} = useForm<RegisterFormData>({
  resolver: zodResolver(registerSchema),

  defaultValues: {
    name: "",
    username: "",
    email: "",
    dateOfBirth: "",
    gender: "",
    password: "",
    rePassword: "",
  },
  mode:'onBlur'
});
  // ==========================================
  // Submit
  // ==========================================

const onSubmit = async (data: RegisterFormData) => {
  try {
    const result = await sendData(data);

    console.log(result);

    toast.success(result.data.message);
    Navigate('/')
    reset();
  } catch  {
    toast.error("Something went wrong. Please try again.");
  }
};

  return (
    <div className="min-h-screen bg-[#FAF6EF] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-120">
        {/* Header */}
        <div className="text-center mb-7">
          <div className="inline-flex items-center gap-2 bg-white border border-[#EAE0D0] rounded-full pl-2 pr-4 py-1.5 shadow-sm">
            <span className="bg-[#FDECEB] text-[#D9484E] text-xs font-medium px-2.5 py-1 rounded-full">
              New
            </span>

            <span className="text-xs font-medium text-[#6E685B]">
              Join logo today
            </span>
          </div>

          <h1 className="text-3xl font-bold text-[#262522] mt-5 tracking-tight">
            Create your account
          </h1>

          <p className="text-sm text-[#A39C8A] mt-2">
            Create your account and join the community.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-[22px] border border-[#EAE0D0] p-7 md:p-9 shadow-[0_16px_48px_rgba(43,42,40,0.09)]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* Full Name */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#262522]">
                Full Name
              </label>

              <div
                className={`bg-[#FFFDF9] border rounded-2xl px-4 py-3.5 flex items-center gap-3 ${
                  errors.name
                    ? "border-red-400"
                    : "border-[#EAE0D0] focus-within:border-[#F05A5B]"
                }`}
              >
                <User size={17} className="text-[#A39C8A] shrink-0" />

                <input
                  type="text"
                  placeholder="Enter your full name"
                  {...register("name")}
                  className="w-full bg-transparent outline-none text-sm text-[#262522] placeholder:text-[#A39C8A]"
                />
              </div>

              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name.message}</p>
              )}
            </div>

            {/* Username */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#262522]">
                Username
              </label>

              <div
                className={`bg-[#FFFDF9] border rounded-2xl px-4 py-3.5 flex items-center gap-3 ${
                  errors.username
                    ? "border-red-400"
                    : "border-[#EAE0D0] focus-within:border-[#F05A5B]"
                }`}
              >
                <AtSign size={17} className="text-[#A39C8A] shrink-0" />

                <input
                  type="text"
                  placeholder="Choose a username"
                  {...register("username")}
                  className="w-full bg-transparent outline-none text-sm text-[#262522] placeholder:text-[#A39C8A]"
                />
              </div>

              {errors.username && (
                <p className="text-red-500 text-xs">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#262522]">
                Email
              </label>

              <div
                className={`bg-[#FFFDF9] border rounded-2xl px-4 py-3.5 flex items-center gap-3 ${
                  errors.email
                    ? "border-red-400"
                    : "border-[#EAE0D0] focus-within:border-[#F05A5B]"
                }`}
              >
                <Mail size={17} className="text-[#A39C8A] shrink-0" />

                <input
                  type="email"
                  placeholder="jane@example.com"
                  {...register("email")}
                  className="w-full bg-transparent outline-none text-sm text-[#262522] placeholder:text-[#A39C8A]"
                />
              </div>

              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>

            {/* Date + Gender */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Date of Birth */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#262522]">
                  Date of Birth
                </label>

                <div
                  className={`bg-[#FFFDF9] border rounded-2xl px-4 py-3.5 flex items-center gap-3 ${
                    errors.dateOfBirth
                      ? "border-red-400"
                      : "border-[#EAE0D0] focus-within:border-[#F05A5B]"
                  }`}
                >
                  <Calendar size={17} className="text-[#A39C8A] shrink-0" />

                  <input
                    type="date"
                    {...register("dateOfBirth")}
                    className="w-full bg-transparent outline-none text-sm text-[#262522]"
                  />
                </div>

                {errors.dateOfBirth && (
                  <p className="text-red-500 text-xs">
                    {errors.dateOfBirth.message}
                  </p>
                )}
              </div>

              {/* Gender */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#262522]">
                  Gender
                </label>

                <select
                  {...register("gender")}
                  className={`w-full bg-[#FFFDF9] border rounded-2xl px-4 py-3.5 outline-none text-sm text-[#262522] ${
                    errors.gender
                      ? "border-red-400"
                      : "border-[#EAE0D0] focus:border-[#F05A5B]"
                  }`}
                >
                  <option value="">Select gender</option>

                  <option value="male">Male</option>

                  <option value="female">Female</option>
                </select>

                {errors.gender && (
                  <p className="text-red-500 text-xs">
                    {errors.gender.message}
                  </p>
                )}
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#262522]">
                Password
              </label>

              <div
                className={`bg-[#FFFDF9] border rounded-2xl px-4 py-3.5 flex items-center gap-3 ${
                  errors.password
                    ? "border-red-400"
                    : "border-[#EAE0D0] focus-within:border-[#F05A5B]"
                }`}
              >
                <Lock size={17} className="text-[#A39C8A] shrink-0" />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimum 8 characters"
                  {...register("password")}
                  className="w-full bg-transparent outline-none text-sm text-[#262522] placeholder:text-[#A39C8A]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="text-[#A39C8A] hover:text-[#F05A5B] transition shrink-0"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-500 text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#262522]">
                Confirm Password
              </label>

              <div
                className={`bg-[#FFFDF9] border rounded-2xl px-4 py-3.5 flex items-center gap-3 ${
                  errors.rePassword
                    ? "border-red-400"
                    : "border-[#EAE0D0] focus-within:border-[#F05A5B]"
                }`}
              >
                <Lock size={17} className="text-[#A39C8A] shrink-0" />

                <input
                  type={showRePassword ? "text" : "password"}
                  placeholder="Repeat your password"
                  {...register("rePassword")}
                  className="w-full bg-transparent outline-none text-sm text-[#262522] placeholder:text-[#A39C8A]"
                />

                <button
                  type="button"
                  onClick={() => setShowRePassword((prev) => !prev)}
                  className="text-[#A39C8A] hover:text-[#F05A5B] transition shrink-0"
                >
                  {showRePassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>

              {errors.rePassword && (
                <p className="text-red-500 text-xs">
                  {errors.rePassword.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#F05A5B] text-white text-sm font-medium py-4 rounded-2xl mt-2 shadow-[0_10px_24px_rgba(240,90,91,0.35)] hover:bg-[#E34F50] transition"
            >
              Create Account
            </button>

            {/* Login */}
            <p className="text-center text-sm text-[#6E685B] mt-2">
              Already have an account?{" "}
              <Link
                to="/"
                className="font-medium text-[#F05A5B] hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
