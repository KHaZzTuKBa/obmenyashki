using Domain.Entities;

namespace Application.DTOs.GetProductList
{
    public record GetProductListResponse(List<ResponseProduct>? Products, int? ProductsAmount, string Message);
}
