using Domain.Entities;

namespace Application.DTOs.GetProductList
{
    public record GetProductListResponse(List<Product>? Products, string Message);
}
