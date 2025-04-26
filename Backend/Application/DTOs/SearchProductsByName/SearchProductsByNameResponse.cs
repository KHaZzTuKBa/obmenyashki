using Domain.Entities;

namespace Application.DTOs.SearchProductsByName
{
    public record SearchProductsByNameResponse(List<ResponseProduct> Products, int Count, string Message);
}
