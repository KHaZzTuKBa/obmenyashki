using System.ComponentModel.DataAnnotations;

namespace Application.DTOs.Registration
{
    public class RegisterDTO
    {
        [Required]
        public string Name { get; set; } = default!;

        [Required]
        public string Email { get; set; } = default!;

        [Required]
        public string Phone { get; set; } = default!;

        [Required]
        public string Password { get; set; } = default!;
    }

}
