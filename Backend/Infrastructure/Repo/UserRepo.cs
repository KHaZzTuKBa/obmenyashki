using Application.Contracts;
using Application.DTOs;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Infrastructure.Repo
{
    internal class UserRepo : IUser
    {
        private readonly AppDbContext appDbContext;
        private readonly IConfiguration configuration;

        public UserRepo(AppDbContext appDbContext, IConfiguration configuration) 
        {
            this.appDbContext = appDbContext;
            this.configuration = configuration;
        }

        public async Task<LoginResponse> LoginUser(LoginDTO loginDTO)
        {
            var getUser = await FindUserByEmail(loginDTO.Email);

            if (getUser == null) return new LoginResponse(1, "1");

            bool checkPassword = BCrypt.Net.BCrypt.Verify(loginDTO.Password, getUser.Password);
            if (checkPassword)
                return new LoginResponse(1, GenerateJWTToken(getUser));
            else
                return new LoginResponse(1, "1");
        }

        public async Task<RegisterResponse> RegisterUser(RegisterDTO registerDTO)
        {
            var getUser = await FindUserByEmail(registerDTO.Email);

            if(getUser != null) return new RegisterResponse(1, "1");

            var newUser = new User()
            {
                Name = registerDTO.Name,
                Email = registerDTO.Email,
                Phone = registerDTO.Phone,
                Password = BCrypt.Net.BCrypt.HashPassword(registerDTO.Password)
            };

            await appDbContext.Users.AddAsync(newUser);

            await appDbContext.SaveChangesAsync();

            return new RegisterResponse(1, GenerateJWTToken(newUser));
        }

        private async Task<User> FindUserByEmail(string email) =>
            await appDbContext.Users.FirstOrDefaultAsync(u => u.Email == email);

        private string GenerateJWTToken(User user)
        {
            var secureKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
            var credentails = new SigningCredentials(secureKey, SecurityAlgorithms.HmacSha256);
            var userClaims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Name!),
                new Claim(ClaimTypes.Email, user.Email!)
            };
            var token = new JwtSecurityToken(
                issuer: configuration["Jwt:Issuer"],
                audience: configuration["Jwt:Audience"],
                claims: userClaims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: credentails
                );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
