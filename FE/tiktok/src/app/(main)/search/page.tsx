"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { searchVideos } from "@/api/video";
import { useEffect } from "react";
import { Video } from "@/types/video";
import Link from "next/link";
export default function page() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [searchRe, setSearchRe] = useState<Video[]>([]);
  useEffect(() => {
    searchVideos(query || "").then((res) => {
      setSearchRe(res.data.data);
    });
  }, [query]);
  return (
    <>
      <div className="mt-4 grid grid-cols-3 gap-1">
        {searchRe.length > 0 ? (
          searchRe.map((video) => (
            <Link
              href={`/video/${video.id}`}
              key={video.id}
              className="aspect-3/4 overflow-hidden bg-gray-200 dark:bg-gray-800"
            >
              <video
                src={video.videoUrl}
                className="h-full w-full object-cover"
              />
            </Link>
          ))
        ) : (
          <div>Không tìm thấy video</div>
        )}
      </div>
    </>
  );
}
