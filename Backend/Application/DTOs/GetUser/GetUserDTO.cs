﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.GetUser
{
    public class GetUserDTO
    {
        [Required]
        public Guid Id { get; set; }
    }
}
