"use client";
import React, { useEffect, useRef } from "react";
import { Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

export interface Message {
  id: string;
  text: string;
  sender: "ai" | "user";
  timestamp: string;
}

export interface Recommendation {
  id: string;
  title: string;
  location: string;
  price: string | number;
  imageUrl?: string;
}

interface AIBusinessAdvisorViewProps {
  chatInput: string;
  activeTab: "chat" | "recommendations";
  messages: Message[];
  recommendations: Recommendation[];
  isLoading: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTabChange: (tab: "chat" | "recommendations") => void;
  onSendMessage: (e: React.FormEvent) => void;
}

export default function AIBusinessAdvisorView({
  chatInput,
  activeTab,
  messages,
  recommendations,
  isLoading,
  onInputChange,
  onTabChange,
  onSendMessage,
}: AIBusinessAdvisorViewProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, activeTab, isLoading]);

  const AILogo = ({ size = "large" }: { size?: "large" | "small" }) => (
    <div
      className={`flex items-center justify-center bg-[#06b6d4] rounded-xl shrink-0 ${
        size === "large" ? "w-10 h-10" : "w-8 h-8 rounded-lg"
      }`}>
      <div
        className={`border-2 border-[#0f172a] rotate-45 ${
          size === "large" ? "w-4 h-4" : "w-3 h-3"
        }`}></div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      <header className="flex items-center justify-between px-8 py-5 bg-[#1a2332] text-white">
        <div className="flex items-center gap-4">
          <AILogo />
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-wide">
              AI Business Advisor
            </h1>
            <p className="text-xs text-slate-400">
              Powered by location intelligence & market data
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-full">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          <span className="text-[11px] font-bold text-emerald-600">
            Online — Analyzing live market data
          </span>
        </div>
      </header>

      <main className="flex flex-col lg:flex-row flex-1 gap-6 p-8 max-w-350 mx-auto w-full">
        <div className="flex flex-col flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden h-[calc(100vh-120px)]">
          <div className="flex border-b border-slate-100">
            <button
              onClick={() => onTabChange("chat")}
              className={`flex-1 py-4 text-sm font-semibold transition-colors cursor-pointer border-b-2 ${
                activeTab === "chat" ?
                  "text-blue-600 border-blue-600 bg-blue-50/30"
                : "text-slate-500 border-transparent hover:text-slate-700"
              }`}>
              Chat
            </button>
            <button
              onClick={() => onTabChange("recommendations")}
              className={`flex-1 py-4 text-sm font-semibold transition-colors cursor-pointer border-b-2 ${
                activeTab === "recommendations" ?
                  "text-blue-600 border-blue-600 bg-blue-50/30"
                : "text-slate-500 border-transparent hover:text-slate-700"
              }`}>
              Recommendations
            </button>
          </div>

          {activeTab === "chat" ?
            <>
              <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-6">
                {messages.map((msg) =>
                  msg.sender === "ai" ?
                    <div key={msg.id} className="flex gap-4 max-w-2xl">
                      <AILogo size="small" />
                      <div className="flex flex-col gap-1">
                        <div className="p-4 bg-slate-50 text-slate-700 text-sm leading-relaxed rounded-2xl rounded-tl-sm border border-slate-100 [&>p]:mb-2 [&>ul]:list-disc [&>ul]:ml-4 [&>ol]:list-decimal [&>ol]:ml-4 [&_strong]:font-bold">
                          <ReactMarkdown>{msg.text}</ReactMarkdown>
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium ml-1">
                          {msg.timestamp}
                        </span>
                      </div>
                    </div>
                  : <div
                      key={msg.id}
                      className="flex gap-4 max-w-2xl self-end flex-row-reverse">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold text-blue-700">
                          You
                        </span>
                      </div>
                      <div className="flex flex-col gap-1 items-end">
                        <div className="p-4 bg-blue-600 text-white text-sm leading-relaxed rounded-2xl rounded-tr-sm shadow-sm">
                          {msg.text}
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium mr-1">
                          {msg.timestamp}
                        </span>
                      </div>
                    </div>,
                )}

                {isLoading && (
                  <div className="flex gap-4 max-w-2xl">
                    <AILogo size="small" />
                    <div className="p-4 bg-slate-50 rounded-2xl rounded-tl-sm border border-slate-100 flex items-center gap-1.5 h-13">
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                      <span
                        className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}></span>
                      <span
                        className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}></span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 border-t border-slate-100 flex flex-col gap-4">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() =>
                      onInputChange({
                        target: {
                          value: "Best locations for a coffee shop in Miami",
                        },
                      } as React.ChangeEvent<HTMLInputElement>)
                    }
                    className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer">
                    Best locations for a coffee shop in Miami
                  </button>
                  <button
                    onClick={() =>
                      onInputChange({
                        target: {
                          value:
                            "What size do I need for a boutique clothing store?",
                        },
                      } as React.ChangeEvent<HTMLInputElement>)
                    }
                    className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer">
                    What size do I need for a boutique clothing store?
                  </button>
                </div>

                <form
                  onSubmit={onSendMessage}
                  className="relative flex items-center">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={onInputChange}
                    disabled={isLoading}
                    placeholder="Ask about locations, business types, budgets..."
                    className="w-full py-4 pl-5 pr-14 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <button
                    type="submit"
                    disabled={!chatInput.trim() || isLoading}
                    className="absolute right-2 flex items-center justify-center w-10 h-10 bg-[#81a1f1] hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-colors shadow-sm cursor-pointer">
                    <Send size={18} className="-ml-0.5" />
                  </button>
                </form>
              </div>
            </>
          : <div className="flex-1 p-6 overflow-y-auto bg-white flex flex-col gap-3">
              <p className="text-xs text-slate-500 mb-4">
                Based on the conversation context, here are your top recommended
                spaces:
              </p>

              {recommendations.length === 0 ?
                <div className="text-center text-sm text-slate-500 mt-10">
                  No recommendations available yet. Start chatting to get
                  personalized spaces!
                </div>
              : recommendations.map((rec, index) => (
                  <div
                    key={rec.id}
                    className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl hover:border-blue-200 hover:bg-blue-50/30 transition-colors cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="relative w-20 h-14 rounded-lg overflow-hidden shrink-0 bg-slate-200">
                        <Image
                          width={10}
                          height={10}
                          src={
                            rec.imageUrl ||
                            "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&q=80"
                          }
                          alt={rec.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <h4 className="text-xs font-extrabold text-slate-900">
                          #{index + 1} {rec.title}
                        </h4>
                        <span className="text-[10px] text-slate-400">
                          {rec.location}
                        </span>
                        <span className="text-xs font-bold text-blue-600 mt-0.5">
                          {rec.price}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          }
        </div>

        <div className="w-full lg:w-95 flex flex-col gap-6 shrink-0 h-[calc(100vh-120px)] overflow-y-auto pr-1 pb-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="mb-6">
              <h3 className="font-bold text-slate-900">Market Snapshot</h3>
              <p className="text-xs text-slate-400">
                Riyadh Commercial — Live Data
              </p>
            </div>

            <div className="flex flex-col">
              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-sm text-slate-500 font-medium">
                  Avg Rent/m²
                </span>
                <div className="text-right">
                  <div className="text-sm font-bold text-slate-900">
                    62000 LE /yr
                  </div>
                  <div className="text-[10px] font-bold text-emerald-500">
                    +8.2%
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-sm text-slate-500 font-medium">
                  Vacancy Rate
                </span>
                <div className="text-right">
                  <div className="text-sm font-bold text-slate-900">6.4%</div>
                  <div className="text-[10px] font-bold text-emerald-500">
                    -1.1%
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-sm text-slate-500 font-medium">
                  New Listings
                </span>
                <div className="text-right">
                  <div className="text-sm font-bold text-slate-900">
                    142 this week
                  </div>
                  <div className="text-[10px] font-bold text-emerald-500">
                    +22
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center pt-3">
                <span className="text-sm text-slate-500 font-medium">
                  Avg Days Listed
                </span>
                <div className="text-right">
                  <div className="text-sm font-bold text-slate-900">
                    18 days
                  </div>
                  <div className="text-[10px] font-bold text-emerald-500">
                    -4 days
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold text-slate-900 mb-6">
              Hot Categories in Riyadh
            </h3>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold text-slate-600">
                    F&B / Café
                  </span>
                  <span className="text-[11px] font-bold text-emerald-500">
                    +24%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#3b82f6] rounded-full w-[85%]"></div>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold text-slate-600">
                    Boutique Retail
                  </span>
                  <span className="text-[11px] font-bold text-emerald-500">
                    +18%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#3b82f6] rounded-full w-[65%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
