using TikTok.Domain.Entities;
using TikTok.Application.DTOs.Video;

namespace TikTok.Application.Interfaces;

public interface IProfileRepository
{
    Task<Profile> GetProfileByIdAsync(Guid id);
    Task UpdateAsync(Profile profile);
}