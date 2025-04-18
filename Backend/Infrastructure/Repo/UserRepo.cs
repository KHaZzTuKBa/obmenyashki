using Application.Contracts;
using Application.DTOs.GetUser;
using Application.DTOs.Login;
using Application.DTOs.RefreshToken;
using Application.DTOs.Registration;
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

            // Если пользователь не найден в БД
            if (getUser == null)
                return new LoginResponse(null, "Неправильный логин или пароль");

            bool checkPassword = BCrypt.Net.BCrypt.Verify(loginDTO.Password, getUser.Password);
            if (checkPassword)
            {
                getUser.IsOnline = true;

                var getUserToken = await FindUserTokenById(getUser.Id);

                // Проверка и установка Access и Refresh Token'ов
                if (getUserToken != null)
                {
                    getUserToken.RefreshToken = GenerateRefreshToken(getUser);
                    getUserToken.ExpiresDate = DateTime.UtcNow.AddDays(14);
                }
                else
                {
                    var newUserToken = new UserToken()
                    {
                        UserId = getUser.Id.ToString(),
                        RefreshToken = GenerateRefreshToken(getUser),
                        ExpiresDate = DateTime.UtcNow.AddDays(14),
                    };

                    await appDbContext.Tokens.AddAsync(newUserToken);                   
                }

                await appDbContext.SaveChangesAsync();

                return new LoginResponse(getUser, GenerateAccessToken(getUser));
            }
            else
                return new LoginResponse(null, "Неправильный логин или пароль");
        }

        public async Task<RegisterResponse> RegisterUser(RegisterDTO registerDTO)
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

            var getUser = await FindUserByEmail(registerDTO.Email);

            var newUserToken = new UserToken()
            {
                UserId = getUser.Id.ToString(),
                RefreshToken = GenerateRefreshToken(newUser),
                ExpiresDate = DateTime.UtcNow.AddDays(14),
            };

            Console.WriteLine();

            await appDbContext.Tokens.AddAsync(newUserToken);

            await appDbContext.SaveChangesAsync();

            return new RegisterResponse(newUser, GenerateAccessToken(newUser));
        }

        public async Task<RefreshTokenResponse> RefreshToken(string oldRefreshToken)
        {
            if (oldRefreshToken == null)
                return null;

            var getUserToken = await FindUserTokenByToken(oldRefreshToken);

            // Если токен не обнаружен или истек срок действия
            if (getUserToken == null || getUserToken.ExpiresDate < DateTime.UtcNow)
                return null;

            // Обновление токена в БД и в Cookie
            var getUser = await FindUserById(Guid.Parse(getUserToken.UserId));

            getUserToken.RefreshToken = GenerateRefreshToken(getUser);
            getUserToken.ExpiresDate = DateTime.UtcNow.AddDays(14);

            await appDbContext.SaveChangesAsync();

            return new RefreshTokenResponse(GenerateAccessToken(getUser), getUserToken.RefreshToken);
        }

        public async Task<GetUserResponse> GetUser(GetUserDTO getUserDTO)
        {
            var getUser = await FindUserById(Guid.Parse(getUserDTO.Id));

            if (getUser == null)
                return null;

            return new GetUserResponse(getUser);
        }

        // Методы для поиска в БД по свойствам
        private async Task<User> FindUserById(Guid Id) =>
            await appDbContext.Users.FirstOrDefaultAsync(u => u.Id == Id);

        private async Task<User> FindUserByEmail(string email) =>
            await appDbContext.Users.FirstOrDefaultAsync(u => u.Email == email);

        private async Task<User> FindUserByPhone(string phone) =>
            await appDbContext.Users.FirstOrDefaultAsync(u => u.Phone == phone);

        private async Task<UserToken> FindUserTokenById(Guid Id) =>
            await appDbContext.Tokens.FirstOrDefaultAsync(u => u.UserId == Id.ToString());

        private async Task<UserToken> FindUserTokenByToken(string token) =>
            await appDbContext.Tokens.FirstOrDefaultAsync(u => u.RefreshToken == token);

        // Генерация Access и Refresh Token'ов
        private string GenerateAccessToken(User user)
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
                new Claim(ClaimTypes.Name, user.Name!),
                new Claim(ClaimTypes.Email, user.Email!)
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
    }
}
