"use server";

import { cookies } from "next/headers";

export async function loginUser(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  try {
    const res = await fetch("https://karam.idreis.net/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const body = await res.json();

    if (!res.ok || body.status !== "success") {
      return { error: body.message || "Failed to log in. Please check your credentials." };
    }

    // Success, store the token securely in cookies
    if (body.data?.token) {
      const cookieStore = await cookies();
      
      const user = body.data?.user || { name: body.data?.name || "User", email };
      cookieStore.set({
        name: "user",
        value: JSON.stringify(user),
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
      });

      cookieStore.set({
        name: "token",
        value: body.data.token,
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });
      return { success: true, message: body.message || "Logged in successfully" };
    }

    return { error: "Token missing from response" };
  } catch (error) {
    console.error("Login Error:", error);
    return { error: "An unexpected error occurred while sign in." };
  }
}

export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  cookieStore.delete("user");
}


export async function registerUser(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const password_confirmation = formData.get("password_confirmation") as string;
  const role = formData.get("role") as string;
  // const phone = formData.get("phone") as string;
  const locationIid = formData.get("location_id") as  string;
  const location_id = parseInt(locationIid, 10);
  // const specialization = formData.get("specialization") as string;

  try{
    const response = await fetch("https://karam.idreis.net/api/v1/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password, password_confirmation, role, location_id }),
  });

  const body = await response.json();

  if (!response.ok || body.status !== "success") {
    return { error: body.message || "Failed to register. Please try again." };
  }

  return { success: true, message: body.message || "Registered successfully" };
} catch (error) {
  console.log(error)
  console.error("Registration Error:", error);
  return { error: "An unexpected error occurred while registering." };
}
}