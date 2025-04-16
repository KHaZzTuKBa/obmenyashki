using Domain.Entities;

namespace Application.DTOs.Login
{
    public record LoginResponse(User user, string token);
}
