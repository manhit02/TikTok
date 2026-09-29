import api from "@/lib/axios";
import { ApiResponse } from "@/types/apiType";
import { Video }from "@/types/video";

export const getFeed = (page = 1, limit = 10) => {
    return api.get<{
        success: boolean;
        data: Video[];
    }>("/videos/feed", {
        params: {
            page,
            limit,
        },
    });
};

export const likeVideo = (videoId: string) => {
    return api.post(`/videos/${videoId}/like`);
};
export const getComments = (videoId: string) => {
    return api.get(`/videos/${videoId}/comments`);
};

export const createComment = (
    videoId: string,
    content: string
) => {
    return api.post(`/videos/${videoId}/comments`, {
        content,
    });
};
export const deleteComment = (commentId: string) => {
    return api.delete(`/videos/${commentId}/comments`);
};
export const viewVideo = (videoId: string) => {
    return api.post(`/videos/${videoId}/view`);
};
export const updateComment = (commentId: string, content: string) => {
    return api.put(`/videos/${commentId}/comments`, { content });
};
export const getUserVideos = (userId: string,page=1,limit=10) => {
    return api.get(`/videos/user/${userId}`, {params: {page, limit}});
};
export const searchVideos=(query:string,page=1,limit=10)=>{
    return api.get<ApiResponse<Video[]>>(`/videos/search`, {params: {page, limit,q:query}});
};