﻿using Domain.Entities;

namespace Application.DTOs.GetUser
{
    public record GetUserResponse(User? User, string Message);
}
