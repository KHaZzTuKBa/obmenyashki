using Domain.Entities;

namespace Application.DTOs.SearchProductsByName
{
    public record SearchProductsByNameResponse(List<ResponseProduct> Products, int ProductsAmount, string Message);
}
