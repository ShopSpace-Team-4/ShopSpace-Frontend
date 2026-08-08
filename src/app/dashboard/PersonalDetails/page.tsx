'use client';

import React, { useState } from 'react';
import PersonalDetailsView from './PersonalDetailsView';

export default function PersonalDetailsPage() {
  // --- States ---
  
  const [formData, setFormData] = useState({
    firstName: 'Ziad', 
    lastName: 'Tarek',
    email: 'ziad.tarek@email.com',
    whatsapp: '0123456789',
    nationalId: '1234567890',
    city: 'Alexandria',
    district: 'Al Olaya',
    bio: ''
  });

  // إعدادات الإشعارات
  const [notifications, setNotifications] = useState({
    email: true,
    whatsapp: true,
    inApp: true
  });

  // وضع الحساب الحالي
  const [activeMode, setActiveMode] = useState<'landlord' | 'tenant'>('landlord');

  // --- Handlers ---

  // تحديث مدخلات الفورم
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // تبديل الإشعارات (Toggle)
  const handleToggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // تبديل الوضع (Landlord / Tenant)
  const handleSwitchMode = (mode: 'landlord' | 'tenant') => {
    setActiveMode(mode);
  };

  // حفظ التعديلات
  const handleSave = () => {
    console.log('Saving Data:', { formData, notifications, activeMode });
    alert('Changes saved successfully!');
    // هنا تضع كود الـ API (مثال: axios.put('/api/user/details', ...))
  };

  // حذف الحساب
  const handleDelete = () => {
    const isConfirmed = window.confirm("Are you sure you want to delete your account? This cannot be undone.");
    if (isConfirmed) {
      console.log('Account deleted');
      // هنا تضع كود الـ API الخاص بالحذف
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