using Domain.Entities;

namespace Application.DTOs.Registration
{
    public record RegisterResponse(User user, string accessToken, string refreshToken);
}
