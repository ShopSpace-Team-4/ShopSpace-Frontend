"use client";

import Link from "next/link";
import Image from "next/image";
import { Bot, UserCircle, Loader2 } from "lucide-react";
import { useUser } from "@/context/UserContext"; 

export default function Navbar() {
  const { user, isLoading } = useUser();

  return (
    <nav className="w-full bg-(--bg-inverse) text-(--text-inverse) border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Image
            src="/favicon.ico"
            alt="ShopSpace Logo"
            width={32}
            height={32}
            className="w-8 h-8"
          />
          <span className="font-bold text-xl tracking-wide">ShopSpace</span>
        </Link>

        <div className="flex items-center gap-3">
          {isLoading ? (
            <div className="px-4 flex items-center justify-center">
              <Loader2 size={18} className="animate-spin text-gray-500" />
            </div>
          ) : user ? (
           
            <>
              <Link
                href="/Ai/Chat" 
                className="cursor-pointer px-4 py-1.5 text-sm font-medium text-gray-300 border border-gray-600 rounded-md flex items-center gap-2 hover:bg-gray-800 transition-colors">
                <Bot size={18} />
                AI Advisor
              </Link>

              <Link
                href="/dashboard/PersonalDetails" 
                className="cursor-pointer px-4 py-1.5 text-sm font-medium text-gray-300 border border-gray-600 rounded-md flex items-center gap-2 hover:bg-gray-800 transition-colors">
                <UserCircle size={18} />
                Profile
              </Link>

              <div className="px-5 py-1.5 text-sm font-semibold bg-gray-800 text-gray-200 border border-gray-700 rounded-full cursor-default">
                Welcome, {user.firstName}
              </div>
            </>
          ) : (
          
            <>
              <Link
                href="#listings" 
                className="px-4 py-1.5 text-sm font-medium text-gray-300 hover:text-white transition-colors cursor-pointer">
                Listings
              </Link>
              
              <Link
                href="#testimonials"
                className="px-4 py-1.5 text-sm font-medium text-gray-300 hover:text-white transition-colors cursor-pointer">
                Testimonials
              </Link>

              <Link
                href="/Login"
                className="ml-2 px-5 py-1.5 text-sm font-medium border border-gray-500 rounded-full hover:bg-gray-800 transition-colors cursor-pointer">
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}