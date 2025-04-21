using Domain.Entities;

namespace Application.DTOs.GetProductList
{
    public record GetProductListContract(List<Product>? Products, int ProductsAmount);
}
