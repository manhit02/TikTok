"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import type { RootState } from "@/store/store";
import LogoutButton from "@/components/auth/LogoutButton";
import { useState } from "react";
import { searchVideos } from "@/api/video";

export default function Header() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const [query, setQuery] = useState("");
  const [searchRe, setSearchRe] = useState([]);
  const handleSearch = async () => {
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <header className="fixed left-60 right-0 top-0 z-40 flex h-16 items-center justify-between border-b bg-white dark:bg-black px-6">
      {/* Search */}
      <div className="w-full max-w-md relative">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          className="w-full rounded-full bg-gray-100 dark:bg-white/10 px-5 py-3 outline-none focus:ring-2 focus:ring-black"
        />
        <div className="absolute top-full left-0 right-0 p-4 bg-white dark:bg-black w-full"></div>
      </div>

      {/* User */}
      <div className="ml-6 flex items-center gap-4">
        <button
          onClick={() => router.push(`/profile/${user?.id}`)}
          className="flex items-center gap-2"
        >
          <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gray-200">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.username}
                className="h-full w-full object-cover"
              />
            ) : (
              <span>👤</span>
            )}
          </div>

          <span className="font-medium">{user?.username}</span>
        </button>

        <LogoutButton />
      </div>
    </header>
  );
}
