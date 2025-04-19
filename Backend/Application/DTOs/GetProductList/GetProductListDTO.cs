using System.ComponentModel.DataAnnotations;

namespace Application.DTOs.GetProductList
{
    public class GetProductListDTO
    {
        [Required]
        public int BunchNumber { get; set; }

        [Required]
        public int BunchSize { get; set; }

        public string SortBy { get; set; } = "PublishDate";
    }
}
