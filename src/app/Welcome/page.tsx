"use client";

import { useRouter } from "next/navigation";
import WelcomeView from "./WelcomeView";
import { useUser } from "@/context/UserContext"; 

export default function WelcomePage() {
  const router = useRouter();

  const { user, isLoading } = useUser();

  const handleGoToAccount = () => {
    router.push("/dashboard/add-listing");
  };

  const handleGoToMarketPlace = () => {
    router.push("/dashboard/marketplace");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <WelcomeView
      userName={user?.firstName}
      onGoToAccount={handleGoToAccount}
      onGoToMarketPlace={handleGoToMarketPlace}
    />
  );
}
