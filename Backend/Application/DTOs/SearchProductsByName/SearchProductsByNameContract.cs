using Domain.Entities;

namespace Application.DTOs.SearchProductsByName
{
    public record SearchProductsByNameContract(List<ResponseProduct>? Products);
}
