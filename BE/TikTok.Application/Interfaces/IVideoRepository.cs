using TikTok.Domain.Entities;
using TikTok.Application.DTOs.Video;

namespace TikTok.Application.Interfaces;

public interface IVideoRepository
{
    Task<List<Video>> GetAllAsync();
    Task<Video?> GetByIdAsync(Guid id);
    Task AddAsync(Video video);
    Task UpdateAsync(Video video);
    Task DeleteAsync(Video video);
    Task<int> IncrementViewsAsync(Guid id);
    Task<List<VideoDto>> GetFeedAsync(Guid? currentUserId, int page, int limit);

}