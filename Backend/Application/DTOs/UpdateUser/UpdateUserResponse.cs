﻿using Domain.Entities;

namespace Application.DTOs.UpdateUser
{
    public record UpdateUserResponse(User? User, string Message);
}
