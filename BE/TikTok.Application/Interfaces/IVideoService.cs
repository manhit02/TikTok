using TikTok.Application.DTOs.Video;

namespace TikTok.Application.Interfaces;

public interface IVideoService
{
    Task<List<VideoDto>> GetAllAsync(Guid? userId);
    Task<VideoDto?> GetByIdAsync(Guid id, Guid? userId);
    Task<VideoDto> CreateAsync(CreateVideoRequest request, Guid userId);
    Task UpdateAsync(Guid id, UpdateVideoRequest request, Guid userId);
    Task DeleteAsync(Guid id, Guid userId);
    Task IncrementViewsAsync(Guid id);
    Task<List<VideoDto>> GetFeedAsync(int page, int pageSize);

}