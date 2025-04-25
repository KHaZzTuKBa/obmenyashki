using Domain.Entities;

namespace Application.DTOs.GetProduct
{
    public record GetProductContract(ResponseProduct? Product, string? OwnerId);
}
