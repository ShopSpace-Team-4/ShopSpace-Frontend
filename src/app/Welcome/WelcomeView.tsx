import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

interface WelcomeViewProps {
  userName?: string; 
  onGoToAccount: () => void;
  onGoToMarketPlace: () => void;
}

export default function WelcomeView({
  userName,
  onGoToAccount,
  onGoToMarketPlace
}: WelcomeViewProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 font-sans">
      <div className="flex flex-col items-center max-w-md text-center">
        
        <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-blue-50 border border-blue-100">
          <Check size={28} className="text-[#3b82f6]" strokeWidth={2.5} />
        </div>
        
        <h1 className="mb-4 text-2xl font-bold text-slate-900">
          {userName ? `Welcome , ${userName}!` : 'Welcome back!'}
        </h1>

        <p className="mb-8 text-sm text-slate-500 leading-relaxed">
          You can now list properties, browse spaces, and<br className="hidden sm:block" />
          manage everything from one place.
        </p>

        <div className="flex flex-col w-full gap-3 sm:w-64">
          <button
            onClick={onGoToAccount}
            className="cursor-pointer flex items-center justify-center w-full gap-2 px-4 py-2.5 text-sm font-semibold text-white transition-colors bg-[#3b82f6] rounded-lg hover:bg-blue-600 shadow-sm"
          >
            Go to My Account
            <ArrowRight size={16} strokeWidth={2.5} />
          </button>
          
          <button
            onClick={onGoToMarketPlace}
            className="cursor-pointer flex items-center justify-center w-full gap-2 px-4 py-2.5 text-sm font-semibold text-white transition-colors bg-[#3b82f6] rounded-lg hover:bg-blue-600 shadow-sm"
          >
            Go to Market Place
            <ArrowRight size={16} strokeWidth={2.5} />
          </button>
        </div>

      </div>
    </div>
  );
}