'use client';

import React, { useState } from 'react';
import LoginView from './LoginView'; // تأكد من صحة المسار حسب هيكلة ملفاتك

export default function LoginPage() {
  // --- States (الحالة) ---
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // --- Handlers (الدوال والمنطق) ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Attempting login with:', { email, password });
  };

  const handleGoogleLogin = () => {
    console.log('Initiating Google Login...');
  };

  const handleAppleLogin = () => {
    console.log('Initiating Apple Login...');
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
      onGoogleLogin={handleGoogleLogin}
      onAppleLogin={handleAppleLogin}
    />
  );
}