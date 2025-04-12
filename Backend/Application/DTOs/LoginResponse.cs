using Domain.Entities;

namespace Application.DTOs
{
    public record LoginResponse(User user, string token);
}
