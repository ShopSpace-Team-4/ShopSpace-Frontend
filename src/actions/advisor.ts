"use server";

import { cookies } from "next/headers";

export async function sendAdvisorMessage(message: string, sessionId: string | null = null) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return { success: false, error: "Unauthorized. Please log in." };
  }

  const body = sessionId ? { message, sessionId } : { message };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/advisor/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();

    if (!response.ok) {
      return { success: false, error: result.message || "Failed to get AI response" };
    }

    return { success: true, data: result.data };
  } catch (error) {
    return { success: false, error: "Network error. Please try again." };
  }
}