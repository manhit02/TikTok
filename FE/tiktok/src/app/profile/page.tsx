"use client";

import Image from "next/image";
import { useParams } from "next/navigation";

export default function ProfilePage() {
  const { uid } = useParams();

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <div className="mx-auto max-w-3xl px-6 py-10">
        {/* Profile info */}
        <div className="flex items-center gap-8">
          {/* Avatar */}
          <div className="relative h-32 w-32 overflow-hidden rounded-full bg-gray-200">
            <Image
              src="/avatar-default.png"
              alt="avatar"
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-bold">@username</h1>

            <p className="mt-1 text-lg font-semibold">Tên người dùng</p>

            <div className="mt-5 flex gap-8">
              <div>
                <p className="font-bold">120</p>
                <p className="text-sm text-gray-500">Đang follow</p>
              </div>

              <div>
                <p className="font-bold">1.2K</p>
                <p className="text-sm text-gray-500">Người follow</p>
              </div>

              <div>
                <p className="font-bold">356</p>
                <p className="text-sm text-gray-500">Lượt thích</p>
              </div>
            </div>

            <button className="mt-5 rounded-md border px-6 py-2 font-semibold hover:bg-gray-100 dark:hover:bg-gray-900">
              Chỉnh sửa hồ sơ
            </button>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-8">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Frontend Developer
          </p>

          <p className="mt-1 text-sm text-gray-500">
            ReactJS • NextJS • TypeScript
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-8 flex border-b">
          <button className="w-1/2 border-b-2 border-black py-4 font-semibold dark:border-white">
            Video
          </button>

          <button className="w-1/2 py-4 text-gray-500">Đã thích</button>
        </div>

        {/* Videos */}
        <div className="mt-4 grid grid-cols-3 gap-1">
          {Array.from({ length: 9 }).map((_, index) => (
            <div
              key={index}
              className="aspect-[3/4] overflow-hidden bg-gray-200 dark:bg-gray-800"
            >
              <video className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
