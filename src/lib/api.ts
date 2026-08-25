// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL; 
// في .env.local:  NEXT_PUBLIC_API_URL=https://shopspace-backend-production.up.railway.app/api/v1

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "حصل خطأ في الطلب");
  }

  return json;
}