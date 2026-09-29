"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { login } from "@/api/auth";
import { setUser } from "@/store/authSlice";
import type { AppDispatch } from "@/store/store";
import Link from "next/link";

export default function Home() {
  const { user, isLoggedIn } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = async () => {
    try {
      const res = await login({
        email: "manh@gmail.com",
        password: "123456",
      });

      const { accessToken, refreshToken, user } = res.data.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      dispatch(setUser(user));

      console.log("Login thành công:", user);
    } catch (error: any) {
      console.log(error.response?.data?.message || error.message);
    }
  };

  return (
    <main>
      <Link href="/feed" className="text-xl text-red-600 font-bold">
        Feed
      </Link>{" "}
      <br />
      <button onClick={handleLogin}>Test Login</button>
    </main>
  );
}
