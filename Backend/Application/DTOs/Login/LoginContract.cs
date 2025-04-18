using Domain.Entities;

namespace Application.DTOs.Login
{
    public record LoginContract(User User, string AccessToken, string RefreshToken);
}
