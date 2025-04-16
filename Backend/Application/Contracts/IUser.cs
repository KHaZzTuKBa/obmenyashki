﻿using Application.DTOs.GetUser;
using Application.DTOs.Login;
using Application.DTOs.RefreshToken;
using Application.DTOs.Registration;

namespace Application.Contracts
{
    public interface IUser
    {
        Task<RegisterResponse> RegisterUser(RegisterDTO regosterDTO);
        Task<LoginResponse> LoginUser(LoginDTO loginDTO);
        Task<RefreshTokenResponse> RefreshToken(string oldRefreshToken);
        Task <GetUserResponse> GetUser(GetUserDTO getUserDTO);
    }
}
