"use client";

import React, { useState } from "react";
import AIBusinessAdvisorView, { Message } from "./AIBusinessAdvisorView";

export default function AIBusinessAdvisorPage() {
  const [chatInput, setChatInput] = useState("");
  const [activeTab, setActiveTab] = useState<"chat" | "recommendations">(
    "chat",
  );

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your ShopSpace AI Business Advisor. I can help you find the perfect commercial space based on your business type, budget, target customers, and growth plans. What kind of business are you looking to open?",
      sender: "ai",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatInput(e.target.value);
  };

  const handleTabChange = (tab: "chat" | "recommendations") => {
    setActiveTab(tab);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!chatInput.trim()) return;

    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: chatInput,
      sender: "user",
      timestamp: currentTime,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setChatInput(""); 

    setTimeout(() => {
      const newAIMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "That's an interesting requirement! Based on current market trends, I've updated the recommendations tab for you. Have a look!",
        sender: "ai",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, newAIMessage]);
    }, 1500);
  };

  return (
    <AIBusinessAdvisorView
      chatInput={chatInput}
      activeTab={activeTab}
      messages={messages} 
      onInputChange={handleInputChange}
      onTabChange={handleTabChange}
      onSendMessage={handleSendMessage}
    />
  );
}
