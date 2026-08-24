"use server";

import { cookies } from "next/headers";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return { success: false, error: "No token found" };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
      },
    });

    const result = await response.json();

    if (!response.ok) {
      return { success: false, error: result.message };
    }

    return { success: true, data: result.data };
    
  } catch (error) {
    return { success: false, error: "Failed to fetch user data" };
  }
}

// 2. الدالة المسؤولة عن تعديل البروفايل
export async function updateProfileAction(data: { firstName: string; lastName: string; phone: string }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return { success: false, error: result.message };
    }

    return { success: true, data: result.data };
  } catch (error) {
    return { success: false, error: "Failed to update profile" };
  }
}