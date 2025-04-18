using Domain.Entities;

namespace Application.DTOs.Registration
{
    public record RegisterContract(User User, string AccessToken, string RefreshToken);
}
