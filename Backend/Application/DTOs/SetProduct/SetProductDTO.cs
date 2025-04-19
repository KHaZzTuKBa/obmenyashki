using System.ComponentModel.DataAnnotations;

namespace Application.DTOs.SetProduct
{
    public class SetProductDTO
    {
        [Required]
        public string? ProductTitle { get; set; } = default!;

        [Required]
        public string? ProductDescription { get; set; } = default!;

        [Required]
        public string? TradeFor { get; set; } = default!;

        [Required]
        public string? OwnerId { get; set; } = default!;

        /*[Required]
        [MinLength(1)]
        public List<IFormFile> Images { get; set; } = new List<IFormFile>();*/
    }
}
