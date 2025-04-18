using System.ComponentModel.DataAnnotations;

namespace Application.DTOs.GetUser
{
    public class GetUserDTO
    {
        [Required]
        public string Id { get; set; } = default!;
    }
}
