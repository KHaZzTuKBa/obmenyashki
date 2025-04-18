using Application.Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Infrastructure.Data;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Application.DTOs.Login;
using Application.DTOs.Registration;
using Application.DTOs.RefreshToken;
using Application.DTOs.GetUser;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class User : ControllerBase
    {
        private readonly IUser user;
        private readonly AppDbContext appDbContext;

        public User(IUser user, AppDbContext appDbContext) 
        {
            this.user = user;
            this.appDbContext = appDbContext;
        }

        [HttpPost("login")]
        public async Task<ActionResult<LoginResponse>> LoginUser(LoginDTO loginDTO)
        {
            var result = await user.LoginUser(loginDTO);

            if (result.user == null)
                return NotFound(result);

            var userToken = await FindUserTokenById(result.user.Id);

            SetRefreshTokenCookie(userToken.RefreshToken);

            return Ok(result);
        }

        [HttpPost("registration")]
        public async Task<ActionResult<RegisterResponse>> RegisterUser(RegisterDTO registerDTO)
        {
            var result = await user.RegisterUser(registerDTO);

            if (result == null)
                 return Unauthorized();           

            var userToken = await FindUserTokenById(result.user.Id);

            SetRefreshTokenCookie(userToken.RefreshToken);

            return Ok(result);
        }

        [HttpGet("refreshToken")]
        public async Task<ActionResult<RefreshTokenResponse>> Refresh()
        {
            var refreshToken = Request.Cookies["refreshToken"];

            var result = await user.RefreshToken(refreshToken);

            if (result == null)
                return Unauthorized();

            SetRefreshTokenCookie(result.refreshToken);

            var getUserToken = await FindUserTokenByToken(refreshToken);
            var getUser = await FindUserById(Guid.Parse(getUserToken.UserId));

            var response = new Tuple<string, Domain.Entities.User>(result.accessToken, getUser);

            return Ok(response);
        }

        [Authorize]
        [HttpGet("logout")]
        public async Task<ActionResult> Logout()
        {
            var refreshToken = Request.Cookies["refreshToken"];

            if (refreshToken == null)
                return Unauthorized("У пользователя отсутвует Refresh Token");

            DeleteRefreshToken(refreshToken);

            return Ok("Refresh Token успешно удален");
        }

        [Authorize]
        [HttpGet("getUser")]
        public async Task<ActionResult<GetUserResponse>> GetUser([FromQuery] GetUserDTO getUserDTO)
        {
            var result = await user.GetUser(getUserDTO);

            if(result == null) 
                return BadRequest("Пользователь не найден");

            return Ok(result);
        }

        // Установка RefreshToken в HttpOnly
        private void SetRefreshTokenCookie(string refreshToken)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Lax,
                Expires = DateTime.UtcNow.AddDays(14),
                Path = "/api/User/refreshToken/"
            };

            Response.Cookies.Append("refreshToken", refreshToken, cookieOptions);
        }

        private void DeleteRefreshToken(string refreshToken)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Lax,
                Expires = DateTime.UtcNow.AddDays(-1),
                Path = "/api/User/refreshToken/"
            };

            Response.Cookies.Append("refreshToken", refreshToken, cookieOptions);
        }

        // Методы для поиска в БД по свойствам
        private async Task<UserToken> FindUserTokenById(Guid Id) =>
            await appDbContext.Tokens.FirstOrDefaultAsync(u => u.UserId == Id.ToString());

        private async Task<UserToken> FindUserTokenByToken(string refreshToken) =>
            await appDbContext.Tokens.FirstOrDefaultAsync(u => u.RefreshToken == refreshToken);

        private async Task<Domain.Entities.User> FindUserById(Guid Id) =>
            await appDbContext.Users.FirstOrDefaultAsync(u => u.Id == Id);
    }
}
