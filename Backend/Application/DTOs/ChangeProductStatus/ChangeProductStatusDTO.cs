using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
