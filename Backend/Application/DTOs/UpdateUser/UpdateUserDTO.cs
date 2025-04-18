using Domain.Entities;
using System.ComponentModel.DataAnnotations;

namespace Application.DTOs.UpdateUser
{
    public class UpdateUserDTO
    {
        [Required]
        public User user { get; set; }
    }
}
