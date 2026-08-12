'use client';

import React, { useState } from 'react';
import AIBusinessAdvisorView from './AIBusinessAdvisorView';

export default function AIBusinessAdvisorPage() {
  // --- States ---
  const [chatInput, setChatInput] = useState('');
  const [activeTab, setActiveTab] = useState<'chat' | 'recommendations'>('chat');

  // --- Handlers ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatInput(e.target.value);
  };

  const handleTabChange = (tab: 'chat' | 'recommendations') => {
    setActiveTab(tab);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!chatInput.trim()) return;

    // هنا تضع منطق إرسال الرسالة إلى الـ AI Backend الخاص بك
    console.log('Sending message to AI:', chatInput);
    
    // تفريغ حقل الإدخال بعد الإرسال
    setChatInput('');
  };

  // --- Render ---
  return (
    <AIBusinessAdvisorView
      chatInput={chatInput}
      activeTab={activeTab}
      onInputChange={handleInputChange}
      onTabChange={handleTabChange}
      onSendMessage={handleSendMessage}
    />
  );
}