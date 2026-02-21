// lib/server/cookies.ts
"use server";
import { cookies } from "next/headers";

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();

  cookieStore.set("accessToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 360 * 60, 
  });
}

export async function clearAuthCookie() {
  const cookieStore = await cookies();

  cookieStore.delete("accessToken");
}

export async function getAuthCookie() {
  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value;
}