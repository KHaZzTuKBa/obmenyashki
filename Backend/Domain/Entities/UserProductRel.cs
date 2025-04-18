using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class UserProductRel
    {
        public Guid Id { get; set; }
        public string? UserId { get; set; } = default!;
        public string? ProductId { get; set; } = default!;
    }
}
