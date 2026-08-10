'use client';

import { useRouter } from 'next/navigation';
import WelcomeView from './WelcomeView'; 

export default function WelcomePage() {
  const router = useRouter();

  
  const handleGoToAccount = () => {
    router.push('/dashboard/add-listing');
    
    
  };

  const handleGoToMarketPlace = () => {
    router.push('/dashboard/marketplace');
    
    
  };

  // --- Render ---
  return (
    <WelcomeView 
      onGoToAccount={handleGoToAccount}
      onGoToMarketPlace={handleGoToMarketPlace}
    />
  );
}