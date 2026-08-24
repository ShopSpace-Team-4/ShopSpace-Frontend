"use client";

import React, { useState } from "react";
import AIBusinessAdvisorView, { Message, Recommendation } from "./AIBusinessAdvisorView";
import { sendAdvisorMessage } from "@/actions/advisor";

export default function AIBusinessAdvisorPage() {
  const [chatInput, setChatInput] = useState("");
  const [activeTab, setActiveTab] = useState<"chat" | "recommendations">("chat");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

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

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    const currentInput = chatInput.trim();
    if (!currentInput || currentInput.length < 2 || currentInput.length > 2000 || isLoading) return;

    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: currentInput,
      sender: "user",
      timestamp: currentTime,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setChatInput("");
    setIsLoading(true);

    const result = await sendAdvisorMessage(currentInput, sessionId);

    if (result.success && result.data) {
      if (!sessionId && result.data.sessionId) {
        setSessionId(result.data.sessionId);
      }

      const newAIMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: result.data.answer,
        sender: "ai",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, newAIMessage]);

      if (result.data.recommendedListings && result.data.recommendedListings.length > 0) {
        const mappedRecommendations: Recommendation[] = result.data.recommendedListings.map(
          (listing: any) => ({
            id: listing.id || Math.random().toString(),
            title: listing.title || "Recommended Space",
            location: listing.city || listing.location || "Location not specified",
            price: listing.rent ? `${listing.rent} LE/yr` : "Price upon request",
            imageUrl: listing.imageUrl || null,
          })
        );
        setRecommendations(mappedRecommendations);
      }
    } else {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `Error: ${result.error}`,
        sender: "ai",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setIsLoading(false);
  };

  return (
    <AIBusinessAdvisorView
      chatInput={chatInput}
      activeTab={activeTab}
      messages={messages}
      recommendations={recommendations}
      isLoading={isLoading}
      onInputChange={handleInputChange}
      onTabChange={handleTabChange}
      onSendMessage={handleSendMessage}
    />
  );
}