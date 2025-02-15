"use client";

import { useState } from "react";
import axios from "axios";
import { useStore } from "@/store/useStore";
import { socket } from "@/lib/socket";

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const setUser = useStore((state) => state.setUser);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);

    try {
      const endpoint = isLogin ? "auth/local" : "auth/local/register";
      const payload = isLogin
        ? {
            identifier: formData.get("email"),
            password: formData.get("password"),
          }
        : {
            username: formData.get("username"),
            email: formData.get("email"),
            password: formData.get("password"),
          };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/${endpoint}`,
        payload
      );

      const userData = {
        id: response.data.user.id,
        email: response.data.user.email,
        username: response.data.user.username,
      };

      setUser(userData);
      socket.connect();
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.error?.message || "An error occurred");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#111b21] p-4">
      <div className="bg-[#202c33] p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl mb-6 font-bold text-[#e9edef] text-center">
          {isLogin ? "Welcome Back" : "Join WhatsChat"}
        </h2>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-full p-3 bg-[#2a3942] text-[#e9edef] rounded border-none focus:ring-2 focus:ring-[#00a884] outline-none placeholder:text-[#8696a0]"
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 bg-[#2a3942] text-[#e9edef] rounded border-none focus:ring-2 focus:ring-[#00a884] outline-none placeholder:text-[#8696a0]"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 bg-[#2a3942] text-[#e9edef] rounded border-none focus:ring-2 focus:ring-[#00a884] outline-none placeholder:text-[#8696a0]"
            required
            minLength={6}
          />

          <button
            type="submit"
            className="w-full p-3 bg-[#00a884] text-white rounded hover:bg-[#00916e] transition-colors font-medium"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#00a884] hover:text-[#00916e]"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
