using System.ComponentModel.DataAnnotations;

namespace Application.DTOs.Login
{
    public class LoginDTO
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
