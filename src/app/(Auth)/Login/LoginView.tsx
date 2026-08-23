import React from "react";
import { Store, Search, ArrowRightLeft, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc"; 
import Image from "next/image";

interface LoginViewProps {
  email: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  password: string;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  onTogglePassword: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onGoogleLoginClick: () => void; 
  onAppleLogin: () => void;
  isLoading: boolean;
  errorMsg: string | null;
}

export default function LoginView({
  email,
  onEmailChange,
  password,
  onPasswordChange,
  showPassword,
  onTogglePassword,
  onSubmit,
  onGoogleLoginClick,
  onAppleLogin,
  isLoading,
  errorMsg,
}: LoginViewProps) {
  return (
    <div className="flex min-h-screen font-sans bg-white">
      <div
        className="hidden lg:flex lg:w-2/3 relative bg-slate-900 text-white flex-col justify-end p-12 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url('/LoginImg.jpg')",
        }}>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-90">
          <Image
            width={200}
            height={200}
            src="/space-shop.png"
            alt="Space Shop Logo"
            className="w-48 h-auto object-contain drop-shadow-2xl"
          />
        </div>

        <div className="relative z-10 max-w-md">
          <h1 className="text-4xl font-bold mb-4">
            One account.
            <br />
            Every role.
          </h1>
          <p className="text-gray-300 text-sm leading-relaxed mb-10">
            List your spaces, browse others, submit rental requests — all from a single profile. No switching accounts.
          </p>

          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <Store size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-1">Post & manage listings</h3>
                <p className="text-xs text-gray-400">List commercial units and track tenant enquiries</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <Search size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-1">Browse & rent spaces</h3>
                <p className="text-xs text-gray-400">Find and apply for units as a tenant, instantly</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <ArrowRightLeft size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-1">Switch modes anytime</h3>
                <p className="text-xs text-gray-400">Flip between landlord and tenant from your dashboard</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full lg:w-1/3 items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="flex items-center justify-center gap-2 mb-12">
            <Image
              src="/space-shop.png"
              width={10}
              height={10}
              alt="ShopSpace Logo"
              className="w-10 h-10 object-contain bg-[--brand-primary]"
            />
            <span className="font-bold text-xl text-slate-900 tracking-tight">ShopSpace</span>
          </div>

          <div className="flex p-1 bg-slate-50 rounded-lg mb-8">
            <a href="./Login" className="flex-1 text-center py-2 text-sm font-semibold bg-white rounded-md shadow-sm text-slate-900 cursor-pointer">
              Log In
            </a>
            <a href="./Signup" className=" text-center flex-1 py-2 text-sm font-semibold text-slate-400 hover:text-slate-600 cursor-pointer">
              Create Account
            </a>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Welcome back</h2>
            <p className="text-sm text-slate-500">Sign in to manage your properties and listings</p>
          </div>

          <div className="flex gap-4 mb-6">
            
            <button
              onClick={onGoogleLoginClick}
              type="button"
              className="flex-1 flex items-center justify-center gap-2 h-10.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              <FcGoogle className="w-5 h-5" />
              <span className="text-sm font-semibold text-slate-700">Google</span>
            </button>
            
            <button
              onClick={onAppleLogin}
              type="button"
              className="flex-1 flex items-center justify-center gap-2 h-10.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              <FaApple className="w-5 h-5 text-slate-900" />
              <span className="text-sm font-semibold text-slate-700">Apple</span>
            </button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <hr className="flex-1 border-slate-200" />
            <span className="text-xs font-semibold text-slate-400 tracking-wider">OR EMAIL</span>
            <hr className="flex-1 border-slate-200" />
          </div>

          {errorMsg && (
            <div className="p-3 mb-4 text-sm text-red-600 bg-red-50 rounded-lg text-center border border-red-200">
              {errorMsg}
            </div>
          )}

          <form onSubmit={onSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 tracking-wider">EMAIL ADDRESS</label>
              <input
                type="email"
                value={email}
                onChange={onEmailChange}
                placeholder="landlord@company.com"
                required
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 tracking-wider">PASSWORD</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={onPasswordChange}
                  placeholder="••••••••"
                  required
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm tracking-widest"
                />
                <button
                  type="button"
                  onClick={onTogglePassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end -mt-2">
              <a href="#" className="text-sm font-semibold text-[#2563eb] hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#3b82f6] hover:bg-blue-600 text-white font-semibold py-3 rounded-lg mt-2 transition-colors text-center cursor-pointer disabled:bg-[#93c5fd] disabled:cursor-not-allowed">
              {isLoading ? "loading..." : "Login"}
            </button>
          </form>

          <div className="mt-8 text-center flex flex-col gap-6">
            <p className="text-sm text-slate-500">
              Don&rsquo;t have an account?{" "}
              <a href="./Signup" className="font-semibold text-[#2563eb] hover:underline">
                Sign Up
              </a>
            </p>

            <a href="./" className="inline-flex items-center justify-center gap-2 text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors">
              <ArrowLeft size={14} />
              Back to ShopSpace
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}