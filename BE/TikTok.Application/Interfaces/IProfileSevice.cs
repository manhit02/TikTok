namespace TikTok.Application.Interfaces;

using TikTok.Domain.Entities;
public interface IProfileSevice
{

    Task<List<Profile>> GetProfileByIdAsync(
    Guid userId);

    Task UpdateAsync(Guid userId,

     UpdateProfileRequest request);
}