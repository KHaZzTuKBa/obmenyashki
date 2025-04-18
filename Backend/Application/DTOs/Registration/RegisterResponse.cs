using Domain.Entities;

namespace Application.DTOs.Registration
{
    public record RegisterResponse(User? User, string? AccessToken, string Message);
}
