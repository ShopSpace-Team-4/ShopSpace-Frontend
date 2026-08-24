'use client';

import React, { useState, useEffect } from 'react';
import PersonalDetailsView from './PersonalDetailsView';
import { useUser } from '@/context/UserContext';
import { updateProfileAction } from '@/actions/user'; 

export default function PersonalDetailsPage() {
  const { user, refetchUser, isLoading: isUserLoading } = useUser();
  
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '', 
    lastName: '',
    email: '',
    whatsapp: '', 
    nationalId: '1234567890', 
    city: 'Alexandria',
    district: 'Al Olaya',
    bio: ''
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        whatsapp: user.phone || '', 
      }));
    }
  }, [user]);

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

  const handleSave = async () => {
    setIsSaving(true);
    
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.whatsapp
    };

    const result = await updateProfileAction(payload);
    
    if (result.success) {
      alert('Profile updated successfully!');
      await refetchUser(); 
    } else {
      alert(`Error updating profile: ${result.error}`);
    }
    
    setIsSaving(false);
  };

  const handleDelete = () => {
    const isConfirmed = window.confirm("Are you sure you want to delete your account? This cannot be undone.");
    if (isConfirmed) {
      console.log('Account deleted');
    }
  };

  if (isUserLoading) {
    return <div className="flex-1 flex justify-center items-center h-screen bg-slate-50">Loading profile...</div>;
  }

  return (
    <PersonalDetailsView
      formData={formData}
      notifications={notifications}
      activeMode={activeMode}
      isSaving={isSaving}
      onChange={handleChange}
      onToggleNotification={handleToggleNotification}
      onSwitchMode={handleSwitchMode}
      onSave={handleSave}
      onDelete={handleDelete}
    />
  );
}