using Domain.Entities;

namespace Application.DTOs.GetProduct
{
    public record GetProductResponse(ResponseProduct? Product, string? OwnerId, string Message);
}
