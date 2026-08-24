"use client";

import React, { useState } from "react";
import SignupView from "./SignupView";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    agreeTerms: false,
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // 2. الـ Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleGoogleSignup = () => {
    console.log("Initiating Google Signup...");
  };

  const handleAppleSignup = () => {
    console.log("Initiating Apple Signup...");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.agreeTerms) {
      alert("You must agree to the Terms of Service.");
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "حدث خطأ أثناء إنشاء الحساب");
      }

      // التوجيه لصفحة الـ OTP مع تمرير الإيميل
      const emailParams = new URLSearchParams({ email: formData.email });
      router.push(`/verify-otp?${emailParams.toString()}`);

    } catch (error: any) {
      setErrorMsg(error.message);
      alert(error.message); 
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SignupView
      formData={formData}
      showPassword={showPassword}
      onChange={handleChange}
      onTogglePassword={togglePasswordVisibility}
      onSubmit={handleSubmit}
      onGoogleSignup={handleGoogleSignup}
      onAppleSignup={handleAppleSignup}
    />
  );
}