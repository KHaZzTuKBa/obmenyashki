using Application.Contracts;
using Application.DTOs.GetUser;
using Application.DTOs.RefreshToken;
using Application.DTOs.Registration;
using Application.DTOs.Login;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Application.DTOs.UpdateUser;

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

        public async Task<LoginResponse?> LoginUser(LoginDTO loginDTO)
        {
            var getUser = await FindUserByEmail(loginDTO.Email);

            // Если пользователь не найден в БД
            if (getUser == null)
                return new LoginResponse(null, "Неправильный логин или пароль", "Неправильный логин или пароль");

            bool checkPassword = BCrypt.Net.BCrypt.Verify(loginDTO.Password, getUser.Password);
            if (checkPassword)
            {
                getUser.IsOnline = true; 

                return new LoginResponse(getUser, GenerateAccessToken(getUser), GenerateRefreshToken(getUser));
            }
            else
                return new LoginResponse(null, "Неправильный логин или пароль", "Неправильный логин или пароль");
        }

        public async Task<RegisterResponse?> RegisterUser(RegisterDTO registerDTO)
        {
            var getUserEmail = await FindUserByEmail(registerDTO.Email);
            var getUserPhone = await FindUserByPhone(registerDTO.Phone);

            // Если номер или почта уже есть в БД
            if (getUserEmail != null || getUserPhone != null) 
                return null;

            // Добавление в БД
            var newUser = new User()
            {
                Name = registerDTO.Name,
                Email = registerDTO.Email,
                Phone = registerDTO.Phone,
                Password = BCrypt.Net.BCrypt.HashPassword(registerDTO.Password),
                IsOnline = true
            };

            await appDbContext.Users.AddAsync(newUser);
            await appDbContext.SaveChangesAsync();

            return new RegisterResponse(newUser, GenerateAccessToken(newUser), GenerateRefreshToken(newUser));
        }

        public async Task<RefreshTokenResponse?> RefreshToken(string oldRefreshToken)
        {
            if (oldRefreshToken == null)
                return null;

            var getUserId = GetUserIdFromRefreshToken(oldRefreshToken);

            // Если токен не обнаружен
            if (getUserId == null)
                return null;

            var getUser = await FindUserById(Guid.Parse(getUserId));

            if (getUser == null)
                return null;

            return new RefreshTokenResponse(GenerateAccessToken(getUser), GenerateRefreshToken(getUser));
        }

        public async Task<GetUserResponse?> GetUser(GetUserDTO getUserDTO)
        {
            var getUser = await FindUserById(Guid.Parse(getUserDTO.Id));

            if (getUser == null)
                return null;

            return new GetUserResponse(getUser);
        }

        public async Task<UpdateUserResponse?> UpdateUser(UpdateUserDTO updateUserDTO)
        {
            var getUser = await FindUserById(updateUserDTO.user.Id);

            if (getUser == null)
                return null;

            getUser.Email = updateUserDTO.user.Email;
            getUser.Name = updateUserDTO.user.Name;
            getUser.Phone = updateUserDTO.user.Phone;
            
            await appDbContext.SaveChangesAsync();

            return new UpdateUserResponse(getUser);
        }

        // Методы для поиска в БД по свойствам
        private async Task<User?> FindUserById(Guid Id) =>
            await appDbContext.Users.FirstOrDefaultAsync(u => u.Id == Id);

        private async Task<User?> FindUserByEmail(string email) =>
            await appDbContext.Users.FirstOrDefaultAsync(u => u.Email == email);

        private async Task<User?> FindUserByPhone(string phone) =>
            await appDbContext.Users.FirstOrDefaultAsync(u => u.Phone == phone);

        // Генерация Access и Refresh Token'ов
        private string GenerateAccessToken(User user)
        {
            var secureKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
            var credentails = new SigningCredentials(secureKey, SecurityAlgorithms.HmacSha256);
            var userClaims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            };
            var token = new JwtSecurityToken(
                issuer: configuration["Jwt:Issuer"],
                audience: configuration["Jwt:Audience"],
                claims: userClaims,
                expires: DateTime.UtcNow.AddMinutes(15),
                signingCredentials: credentails
                );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private string GenerateRefreshToken(User user)
        {
            var secureKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
            var credentails = new SigningCredentials(secureKey, SecurityAlgorithms.HmacSha256);
            var userClaims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            };
            var token = new JwtSecurityToken(
                issuer: configuration["Jwt:Issuer"],
                audience: configuration["Jwt:Audience"],
                claims: userClaims,
                expires: DateTime.UtcNow.AddDays(14),
                signingCredentials: credentails
                );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public string? GetUserIdFromRefreshToken(string refreshToken)
        {           
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"])),

                ValidateIssuer = true,
                ValidIssuer = configuration["Jwt:Issuer"],

                ValidateAudience = true,
                ValidAudience = configuration["Jwt:Audience"],

                ValidateLifetime = false,

                ClockSkew = TimeSpan.Zero
            };

            var tokenHandler = new JwtSecurityTokenHandler();
               
            ClaimsPrincipal principal = tokenHandler.ValidateToken(refreshToken, tokenValidationParameters, out SecurityToken securityToken);

            if (securityToken is not JwtSecurityToken jwtSecurityToken || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                return null;

            Claim? userIdClaim = principal.FindFirst(ClaimTypes.NameIdentifier);

            return userIdClaim?.Value;    
        }
    }
}
