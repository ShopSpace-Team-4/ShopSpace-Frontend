"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import SpaceShopLogo from "../../../../public/space-shop.png";
import { ArrowLeft } from "lucide-react";

function VerifyOtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";

  const [otpCode, setOtpCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/verify`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otpCode }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Invalid OTP code");
      }

      router.push("/Login?verified=true");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError("");
    setSuccessMsg("");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/resend-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to resend OTP");
      }

      setSuccessMsg("A new code has been sent to your email!");
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Invalid request. No email provided.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen font-sans bg-slate-50 items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="flex flex-col items-center mb-8">
          <Image
            src={SpaceShopLogo}
            alt="ShopSpace Logo"
            className="w-12 h-12 object-contain mb-4"
          />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Check your email
          </h2>
          <p className="text-sm text-slate-500 text-center">
            We sent a 6-digit verification code to <br />
            <span className="font-semibold text-slate-900">{email}</span>
          </p>
        </div>

        {error && (
          <div className="p-3 mb-4 text-sm text-red-600 bg-red-50 rounded-lg text-center">
            {error}
          </div>
        )}

        {successMsg && (
          <div className="p-3 mb-4 text-sm text-green-600 bg-green-50 rounded-lg text-center">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">
              Verification Code (6 Digits)
            </label>
            <input
              type="text"
              maxLength={6}
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))} // يمنع كتابة أي حروف
              placeholder="123456"
              required
              className="w-full px-3 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center tracking-[0.5em] text-lg font-bold placeholder:text-slate-300"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || otpCode.length !== 6}
            className="w-full cursor-pointer text-center bg-[#cbd5e1] text-white font-semibold py-2.5 rounded-lg mt-2 transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:hover:bg-[#cbd5e1] text-sm">
            {isLoading ? "Verifying..." : "Verify Account"}
          </button>
        </form>

        <div className="mt-8 text-center flex flex-col gap-4">
          <p className="text-xs text-slate-500">
            Didn't receive the code?{" "}
            <button
              onClick={handleResendOtp}
              className="font-semibold text-blue-600 hover:underline">
              Resend Code
            </button>
          </p>

          <a
            href="./Signup"
            className="inline-flex items-center justify-center gap-1.5 text-[11px] font-semibold text-slate-400 hover:text-slate-600 transition-colors">
            <ArrowLeft size={12} />
            Back to Sign up
          </a>
        </div>
      </div>
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }>
      <VerifyOtpForm />
    </Suspense>
  );
}
