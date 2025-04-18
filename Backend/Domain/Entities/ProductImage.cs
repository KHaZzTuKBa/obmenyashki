using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class ProductImage
    {
        public Guid Id { get; set; }
        public string ProductGuid { get; set; } = default!;
        public string ImageURL { get; set; } = default!;
    }
}
