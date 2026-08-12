import React from 'react';
import { Send } from 'lucide-react';

interface AIBusinessAdvisorViewProps {
  chatInput: string;
  activeTab: 'chat' | 'recommendations';
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTabChange: (tab: 'chat' | 'recommendations') => void;
  onSendMessage: (e: React.FormEvent) => void;
}

export default function AIBusinessAdvisorView({
  chatInput,
  activeTab,
  onInputChange,
  onTabChange,
  onSendMessage
}: AIBusinessAdvisorViewProps) {
  
  const AILogo = ({ size = 'large' }: { size?: 'large' | 'small' }) => (
    <div className={`flex items-center justify-center bg-[#06b6d4] rounded-xl shrink-0 ${size === 'large' ? 'w-10 h-10' : 'w-8 h-8 rounded-lg'}`}>
      <div className={`border-2 border-[#0f172a] rotate-45 ${size === 'large' ? 'w-4 h-4' : 'w-3 h-3'}`}></div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      
      {/* ---------------- Header (الشريط العلوي) ---------------- */}
      <header className="flex items-center justify-between px-8 py-5 bg-[#1a2332] text-white">
        <div className="flex items-center gap-4">
          <AILogo />
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-wide">AI Business Advisor</h1>
            <p className="text-xs text-slate-400">Powered by location intelligence & market data</p>
          </div>
        </div>
        
        {/* Status Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-full">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          <span className="text-[11px] font-bold text-emerald-600">Online — Analyzing live market data</span>
        </div>
      </header>

      {/* ---------------- Main Content (المحتوى الرئيسي) ---------------- */}
      <main className="flex flex-col lg:flex-row flex-1 gap-6 p-8 max-w-[1400px] mx-auto w-full">
        
        {/* ----- الجانب الأيسر: منطقة المحادثة (Chat Area) ----- */}
        <div className="flex flex-col flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden h-[calc(100vh-120px)]">
          
          {/* Tabs */}
          <div className="flex border-b border-slate-100">
            <button 
              onClick={() => onTabChange('chat')}
              className={`flex-1 py-4 text-sm font-semibold transition-colors border-b-2 ${activeTab === 'chat' ? 'text-blue-600 border-blue-600' : 'text-slate-500 border-transparent hover:text-slate-700'}`}
            >
              Chat
            </button>
            <button 
              onClick={() => onTabChange('recommendations')}
              className={`flex-1 py-4 text-sm font-semibold transition-colors border-b-2 ${activeTab === 'recommendations' ? 'text-blue-600 border-blue-600' : 'text-slate-500 border-transparent hover:text-slate-700'}`}
            >
              Recommendations
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="flex gap-4 max-w-2xl">
              <AILogo size="small" />
              <div className="flex flex-col gap-1">
                <div className="p-4 bg-slate-50 text-slate-700 text-sm leading-relaxed rounded-2xl rounded-tl-sm border border-slate-100">
                  Hello! I'm your ShopSpace AI Business Advisor. I can help you find the perfect commercial space based on your business type, budget, target customers, and growth plans. What kind of business are you looking to open?
                </div>
                <span className="text-[10px] text-slate-400 font-medium ml-1">06:31 AM</span>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-slate-100 flex flex-col gap-4">
            {/* Suggested Prompts */}
            <div className="flex flex-wrap gap-2">
              <button className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors">
                Best locations for a coffee shop in Miami
              </button>
              <button className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors">
                What size do I need for a boutique clothing store?
              </button>
              <button className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors">
                Compare Tahlia Street vs Al Olaya for F&B
              </button>
              <button className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors">
                Budget breakdown for opening a pharmacy
              </button>
            </div>

            {/* Form */}
            <form onSubmit={onSendMessage} className="relative flex items-center">
              <input 
                type="text" 
                value={chatInput}
                onChange={onInputChange}
                placeholder="Ask about locations, business types, budgets..." 
                className="w-full py-4 pl-5 pr-14 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
              />
              <button 
                type="submit"
                className="absolute right-2 flex items-center justify-center w-10 h-10 bg-[#81a1f1] hover:bg-blue-500 text-white rounded-xl transition-colors shadow-sm"
              >
                <Send size={18} className="-ml-0.5" />
              </button>
            </form>
          </div>
        </div>

        <div className="w-full lg:w-95 flex flex-col gap-6 shrink-0 h-[calc(100vh-120px)] overflow-y-auto pr-1 pb-4">
          
          {/* Widget 1: Market Snapshot */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="mb-6">
              <h3 className="font-bold text-slate-900">Market Snapshot</h3>
              <p className="text-xs text-slate-400">Riyadh Commercial — Live Data</p>
            </div>
            
            <div className="flex flex-col">
              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-sm text-slate-500 font-medium">Avg Rent/m²</span>
                <div className="text-right">
                  <div className="text-sm font-bold text-slate-900">62000 LE /yr</div>
                  <div className="text-[10px] font-bold text-emerald-500">+8.2%</div>
                </div>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-sm text-slate-500 font-medium">Vacancy Rate</span>
                <div className="text-right">
                  <div className="text-sm font-bold text-slate-900">6.4%</div>
                  <div className="text-[10px] font-bold text-emerald-500">-1.1%</div>
                </div>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-sm text-slate-500 font-medium">New Listings</span>
                <div className="text-right">
                  <div className="text-sm font-bold text-slate-900">142 this week</div>
                  <div className="text-[10px] font-bold text-emerald-500">+22</div>
                </div>
              </div>
              <div className="flex justify-between items-center pt-3">
                <span className="text-sm text-slate-500 font-medium">Avg Days Listed</span>
                <div className="text-right">
                  <div className="text-sm font-bold text-slate-900">18 days</div>
                  <div className="text-[10px] font-bold text-emerald-500">-4 days</div>
                </div>
              </div>
            </div>
          </div>

          {/* Widget 2: AI Confidence Score */}
          <div className="bg-blue-50/50 rounded-2xl border border-blue-100 shadow-sm p-6">
            <h3 className="font-bold text-slate-900 mb-4">AI Confidence Score</h3>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-5xl font-extrabold text-[#3b82f6] tracking-tighter">94</span>
              <span className="text-xl font-bold text-blue-600/70">/100</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-62.5">
              Based on 6 data points from your conversation. Add more details to improve accuracy.
            </p>
          </div>

          {/* Widget 3: Hot Categories */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold text-slate-900 mb-6">Hot Categories in Riyadh</h3>
            <div className="flex flex-col gap-5">
              
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold text-slate-600">F&B / Café</span>
                  <span className="text-[11px] font-bold text-emerald-500">+24%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#3b82f6] rounded-full w-[85%]"></div>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold text-slate-600">Boutique Retail</span>
                  <span className="text-[11px] font-bold text-emerald-500">+18%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#3b82f6] rounded-full w-[65%]"></div>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold text-slate-600">Healthcare</span>
                  <span className="text-[11px] font-bold text-emerald-500">+31%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#3b82f6] rounded-full w-[92%]"></div>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold text-slate-600">Tech Office</span>
                  <span className="text-[11px] font-bold text-emerald-500">+15%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#3b82f6] rounded-full w-[55%]"></div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}