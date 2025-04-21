using Domain.Entities;

namespace Application.DTOs.GetUserProducts
{
    public record GetUserProductsContract(List<ResponseProduct>? Products);
}
