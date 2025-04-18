using Domain.Entities;

namespace Application.DTOs.Login
{
    public record LoginResponse(User? User, string? AccessToken, string Message);
}
