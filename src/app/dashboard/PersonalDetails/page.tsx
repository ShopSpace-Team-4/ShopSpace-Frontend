'use client';

import React, { useState } from 'react';
import PersonalDetailsView from './PersonalDetailsView';

export default function PersonalDetailsPage() {
  
  const [formData, setFormData] = useState({
    firstName: '***', 
    lastName: '***',
    email: '****',
    whatsapp: '0123456789',
    nationalId: '1234567890',
    city: '****',
    district: '****',
    bio: ''
  });

  const [notifications, setNotifications] = useState({
    email: true,
    whatsapp: true,
    inApp: true
  });

  const [activeMode, setActiveMode] = useState<'landlord' | 'tenant'>('landlord');

  // --- Handlers ---

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleToggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSwitchMode = (mode: 'landlord' | 'tenant') => {
    setActiveMode(mode);
  };

  const handleSave = () => {
    console.log('Saving Data:', { formData, notifications, activeMode });
    alert('Changes saved successfully!');
  };

  const handleDelete = () => {
    const isConfirmed = window.confirm("Are you sure you want to delete your account? This cannot be undone.");
    if (isConfirmed) {
      console.log('Account deleted');
    }
  };

  return (
    <PersonalDetailsView
      formData={formData}
      notifications={notifications}
      activeMode={activeMode}
      onChange={handleChange}
      onToggleNotification={handleToggleNotification}
      onSwitchMode={handleSwitchMode}
      onSave={handleSave}
      onDelete={handleDelete}
    />
  );
}