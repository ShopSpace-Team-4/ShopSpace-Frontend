"use client";

import React, { useState } from "react";
import LoginView from "./LoginView";
import { loginAction, googleAuthAction } from "@/actions/auth";
import { useGoogleLogin } from "@react-oauth/google"; 

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);

    const result = await loginAction(email, password);
    
    if (!result.success) {
      setIsLoading(false); // بنوقف التحميل بس لو في إيرور
      setErrorMsg(result.error as string);
      return;
    }

    // الحل هنا: توجيه إجباري يضمن إن الـ Middleware يقرا الكوكيز من أول مرة
    window.location.href = "/Welcome";
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      setErrorMsg(null);

      const result = await googleAuthAction(tokenResponse.access_token);
      
      if (!result.success) {
        setIsLoading(false);
        setErrorMsg(result.error as string);
        return;
      }

      window.location.href = "/Welcome";
    },
    onError: () => setErrorMsg("Google Login Failed. Please try again."),
  });

  const handleAppleLogin = () => {
    console.log("Initiating Apple Login...");
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <LoginView
      email={email}
      onEmailChange={(e) => setEmail(e.target.value)}
      password={password}
      onPasswordChange={(e) => setPassword(e.target.value)}
      showPassword={showPassword}
      onTogglePassword={togglePasswordVisibility}
      onSubmit={handleSubmit}
      onGoogleLoginClick={() => loginWithGoogle()} 
      onAppleLogin={handleAppleLogin}
      isLoading={isLoading}
      errorMsg={errorMsg}
    />
  );
}