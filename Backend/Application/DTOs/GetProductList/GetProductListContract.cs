using Domain.Entities;

namespace Application.DTOs.GetProductList
{
    public record GetProductListContract(List<ResponseProduct>? Products, int ProductsAmount);
}
