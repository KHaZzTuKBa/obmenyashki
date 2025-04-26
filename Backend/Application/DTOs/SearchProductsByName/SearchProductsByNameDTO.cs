using System.ComponentModel.DataAnnotations;

namespace Application.DTOs.SearchProductsByName
{
    public class SearchProductsByNameDTO
    {
        [Required]
        public string? ProductName { get; set; } = default!;

        [Required]
        public int BunchNumber { get; set; } = default!;

        [Required]
        public int BunchSize { get; set; } = default!;
    }
}
