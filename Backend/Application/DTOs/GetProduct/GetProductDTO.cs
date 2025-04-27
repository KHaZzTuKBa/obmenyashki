using System.ComponentModel.DataAnnotations;

namespace Application.DTOs.GetProduct
{
    public class GetProductDTO
    {
    [Required]
    public string ProductId { get; set; } = default!;
    }
}
