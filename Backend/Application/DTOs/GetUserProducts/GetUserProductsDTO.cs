using System.ComponentModel.DataAnnotations;

namespace Application.DTOs.GetUserProducts
{
    public class GetUserProductsDTO
    {
        [Required]
        public string UserId { get; set; } = default!;
    }
}
