import React from "react";
import {
  Store,
  Search,
  ArrowRightLeft,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";
import Image from "next/image";

interface LoginViewProps {
  email: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  password: string;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  onTogglePassword: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onGoogleLogin: () => void;
  onAppleLogin: () => void;
}

export default function LoginView({
  email,
  onEmailChange,
  password,
  onPasswordChange,
  showPassword,
  onTogglePassword,
  onSubmit,
  onGoogleLogin,
  onAppleLogin,
}: LoginViewProps) {
  return (
    <div className="flex min-h-screen font-sans bg-white">
      {/* الجانب الأيسر - الصورة والمعلومات */}
      <div
        className="hidden lg:flex lg:w-2/3 relative bg-slate-900 text-white flex-col justify-end p-12 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url('/LoginImg.jpg')",
        }}>
        {/* اللوجو الكبير في المنتصف باستخدام الصورة الخاصة بك */}
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
            List your spaces, browse others, submit rental requests — all from a
            single profile. No switching accounts.
          </p>

          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <Store size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-1">
                  Post & manage listings
                </h3>
                <p className="text-xs text-gray-400">
                  List commercial units and track tenant enquiries
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <Search size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-1">
                  Browse & rent spaces
                </h3>
                <p className="text-xs text-gray-400">
                  Find and apply for units as a tenant, instantly
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <ArrowRightLeft size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-1">
                  Switch modes anytime
                </h3>
                <p className="text-xs text-gray-400">
                  Flip between landlord and tenant from your dashboard
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* الجانب الأيمن - نموذج تسجيل الدخول */}
      <div className="flex w-full lg:w-1/3 items-center justify-center p-8">
        <div className="w-full max-w-sm">
          {/* اللوجو الصغير بجانب اسم البراند */}
          <div className="flex items-center justify-center gap-2 mb-12">
            <Image
              src="/space-shop.png"
              width={10}
              height={10}
              alt="ShopSpace Logo"
              className="w-10 h-10 object-contain bg-[--brand-primary]"
            />
            <span className="font-bold text-xl text-slate-900 tracking-tight">
              ShopSpace
            </span>
          </div>

          <div className="flex p-1 bg-slate-50 rounded-lg mb-8">
            <a
              href="./Login"
              className="flex-1 text-center py-2 text-sm font-semibold bg-white rounded-md shadow-sm text-slate-900 cursor-pointer">
              Log In
            </a>
            <a
              href="Signup"
              className=" text-center flex-1 py-2 text-sm font-semibold text-slate-400 hover:text-slate-600 cursor-pointer">
              Create Account
            </a>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Welcome back
            </h2>
            <p className="text-sm text-slate-500">
              Sign in to manage your properties and listings
            </p>
          </div>

          <div className="flex gap-4 mb-6">
            <button
              onClick={onGoogleLogin}
              type="button"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-sm font-semibold text-slate-700">
                Google
              </span>
            </button>
            <button
              onClick={onAppleLogin}
              type="button"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.15 2.95.97 3.67 2.12-3.4 1.95-2.8 6.46.45 7.78-.71 1.34-1.63 2.72-2.77 3.11zm-4.79-13.43c-.22-1.92 1.4-3.5 3.23-3.85.34 2.01-1.6 3.61-3.23 3.85z" />
              </svg>
              <span className="text-sm font-semibold text-slate-700">
                Apple
              </span>
            </button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <hr className="flex-1 border-slate-200" />
            <span className="text-xs font-semibold text-slate-400 tracking-wider">
              OR EMAIL
            </span>
            <hr className="flex-1 border-slate-200" />
          </div>

          <form onSubmit={onSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 tracking-wider">
                EMAIL ADDRESS
              </label>
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
              <label className="text-xs font-bold text-slate-500 tracking-wider">
                PASSWORD
              </label>
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
                  {showPassword ?
                    <EyeOff size={18} />
                  : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end -mt-2">
              <a
                href="#"
                className="text-sm font-semibold text-[#2563eb] hover:underline">
                Forgot password?
              </a>
            </div>

            <a
              type="submit"
              href="./Welcome"
              className="w-full bg-[#3b82f6] hover:bg-blue-600 text-white font-semibold py-3 rounded-lg mt-2 transition-colors text-center cursor-pointer">
              Sign In
            </a>
          </form>

          <div className="mt-8 text-center flex flex-col gap-6">
            <p className="text-sm text-slate-500">
              Don&rsquo;t have an account?{" "}
              <a
                href="./Signup"
                className="font-semibold text-[#2563eb] hover:underline">
                Sign Up
              </a>
            </p>

            <a
              href="./"
              className="inline-flex items-center justify-center gap-2 text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors">
              <ArrowLeft size={14} />
              Back to ShopSpace
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
