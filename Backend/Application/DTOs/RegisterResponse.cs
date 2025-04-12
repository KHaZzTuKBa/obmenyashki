using Domain.Entities;

namespace Application.DTOs
{
    public record RegisterResponse(User user, string token);
}
