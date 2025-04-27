using System.ComponentModel.DataAnnotations;

namespace Application.DTOs.ChangeProductStatus
{
    public class ChangeProductStatusDTO
    {
        [Required]
        public string? ProductId { get; set; } = default!;

        [Required]
        public bool? IsActive { get; set; } = default!;
    }
}
