using Domain.Entities;

namespace Application.DTOs.GetUserProducts
{
    public record GetUserProductsResponse(List<ResponseProduct> Products, string Message);
}
