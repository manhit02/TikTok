"use client";

import Image from "next/image";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getUser, getFollowing, getFollowers } from "@/api/user";
import { Users, Follow } from "@/types/user";
import { popupST } from "@/components/popup/popupST";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { getUserVideos } from "@/api/video";
import { Video } from "@/types/video";

export default function ProfilePage() {
  const { uid } = useParams();
  const userMe = useSelector((state: RootState) => state.auth.user);
  const [user, setUser] = useState<Users>();
  const [userVideos, setUserVideos] = useState<Video[]>([]);
  const [following, setFollowing] = useState<Follow[]>([]);
  const [follower, setFollower] = useState<Follow[]>([]);
  const path = usePathname();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (path === "/profile/me") {
          if (!userMe?.id) return;

          const res = await getUser(userMe.id);
          setUser(res.data.data);
        } else {
          if (!uid) return;

          const res = await getUser(uid as string);
          setUser(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchUserVideo = async () => {
      try {
        if (path === "/profile/me") {
          if (!userMe?.id) return;
          const res = await getUserVideos(userMe.id);
          setUserVideos(res.data.data);
        } else {
          if (!uid) return;

          const res = await getUserVideos(uid as string);
          setUserVideos(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
    fetchUserVideo();
  }, [path, uid, userMe]);
  const handleShowFollowing = async () => {
    try {
      if (!user?.id) return;
      const res = await getFollowing(userId);
      const data = res.data.data;
      setFollowing(data);

      popupST.open(
        <>
          <div className="flex flex-col">
            {data &&
              data.map((item) => (
                <div key={item.id} className="flex">
                  <Image
                    src={item.follower.avatar || "/avatar-default.png"}
                    alt="avatar"
                    width={50}
                    height={50}
                  />
                  <p className="dark:text-white text-white">
                    {item.follower.username}
                  </p>
                </div>
              ))}
          </div>
        </>,
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleShowFollower = async () => {
    try {
      if (!user?.id) return;
      const res = await getFollowers(userId);
      const data = res.data.data;
      setFollower(data);
      popupST.open(
        <>
          <div className="flex flex-col">
            {data &&
              data.map((item) => (
                <div key={item.id} className="flex">
                  <Image
                    src={item.follower.avatar}
                    alt="avatar"
                    width={50}
                    height={50}
                  />
                  <p>{item.follower.username}</p>
                </div>
              ))}
          </div>
        </>,
      );
    } catch (error) {
      console.log(error);
    }
  };
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
            <h1 className="text-2xl font-bold">@{user?.username}</h1>

            <p className="mt-1 text-lg font-semibold">{user?.username}</p>

            <div className="mt-5 flex gap-8">
              <div onClick={handleShowFollowing} className="cursor-pointer">
                <p className="font-bold">{user?.following || 0}</p>
                <p className="text-sm text-gray-500">Đang follow</p>
              </div>

              <div
                onClick={() => {
                  handleShowFollower();
                }}
                className="cursor-pointer"
              >
                <p className="font-bold">{user?.followers || 0}</p>
                <p className="text-sm text-gray-500">Người follow</p>
              </div>

              <div>
                <p className="font-bold">{user?.likeCount || 0}</p>
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
            {user?.bio || "Không có bio"}
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
          {userVideos?.map((video) => (
            <div
              key={video.id}
              className="aspect-[3/4] overflow-hidden bg-gray-200 dark:bg-gray-800"
            >
              <video
                src={video.videoUrl}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
