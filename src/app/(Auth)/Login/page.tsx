"use client";

import React, { useState } from "react";
import LoginView from "./LoginView";
import { useRouter } from "next/navigation";
import { loginAction, googleAuthAction } from "@/actions/auth";
import { useGoogleLogin } from "@react-oauth/google"; 

export default function LoginPage() {
  const router = useRouter();

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
    setIsLoading(false);

    if (!result.success) {
      setErrorMsg(result.error as string);
      return;
    }

    router.push("/Welcome");
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      setErrorMsg(null);

      // هنا بنبعت التوكن للـ Server Action
      const result = await googleAuthAction(tokenResponse.access_token);

      setIsLoading(false);

      if (!result.success) {
        setErrorMsg(result.error as string);
        return;
      }

      router.push("/Welcome");
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