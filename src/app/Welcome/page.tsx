'use client';

import { useRouter } from 'next/navigation';
import WelcomeView from './WelcomeView'; 

export default function WelcomePage() {
  const router = useRouter();

  
  const handleGoToAccount = () => {
    console.log('Navigating to Account Dashboard...');
    
    router.push('/account'); 
  };

  const handleGoToMarketPlace = () => {
    console.log('Navigating to Market Place...');
    
    router.push('/marketplace'); 
  };

  // --- Render ---
  return (
    <WelcomeView 
      onGoToAccount={handleGoToAccount}
      onGoToMarketPlace={handleGoToMarketPlace}
    />
  );
}