using Domain.Entities;

namespace Application.DTOs.GetUserProducts
{
    public record GetUserProductsResponse(List<Product>? Products, string Message);
}
