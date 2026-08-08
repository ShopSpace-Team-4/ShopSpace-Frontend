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

  // --- Handlers ---
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agreeTerms) {
      alert("You must agree to the Terms of Service.");
      return;
    }
    console.log("Account Created successfully!");

    router.push("/Login");

    console.log("Form Submitted Data:", formData);
  };

  const handleGoogleSignup = () => {
    console.log("Initiating Google Signup...");
  };

  const handleAppleSignup = () => {
    console.log("Initiating Apple Signup...");
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
