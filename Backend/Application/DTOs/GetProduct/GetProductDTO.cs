using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.GetProduct
{
    public class GetProductDTO
    {
    [Required]
    public string ProductId { get; set; } = default!;
    }
}
