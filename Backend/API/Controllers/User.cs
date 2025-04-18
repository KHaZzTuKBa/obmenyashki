using Application.Contracts;
using Microsoft.AspNetCore.Mvc;
using Infrastructure.Data;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Application.DTOs.GetUser;
using Application.DTOs.Login;
using Application.DTOs.RefreshToken;
using Application.DTOs.Registration;
using Application.DTOs.UpdateUser;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class User : ControllerBase
    {
        private readonly IUser user;
        private readonly AppDbContext appDbContext;
        private readonly IConfiguration configuration;

        public User(IUser user, AppDbContext appDbContext, IConfiguration configuration) 
        {
            this.user = user;
            this.appDbContext = appDbContext;
            this.configuration = configuration;
        }

        [HttpPost("login")]
        public async Task<ActionResult<LoginResponse>> LoginUser(LoginDTO loginDTO)
        {
            var result = await user.LoginUser(loginDTO);

            if (result.user == null)
                return NotFound(result);

            SetRefreshTokenCookie(result.message);

            var response = new Tuple<Domain.Entities.User, string>(result.user, result.accessToken);

            return Ok(response);
        }

        [HttpPost("registration")]
        public async Task<ActionResult<RegisterResponse>> RegisterUser(RegisterDTO registerDTO)
        {
            var result = await user.RegisterUser(registerDTO);

            if (result == null)
                 return Unauthorized();           

            SetRefreshTokenCookie(result.refreshToken);

            var response = new Tuple<Domain.Entities.User, string>(result.user, result.accessToken);

            return Ok(response);
        }

        [HttpGet("refreshToken")]
        public async Task<ActionResult<RefreshTokenResponse>> Refresh()
        {
            var refreshToken = Request.Cookies["refreshToken"];

            if(refreshToken == null)
                return Unauthorized();

            var result = await user.RefreshToken(refreshToken);

            if (result == null)
                return Unauthorized();

            SetRefreshTokenCookie(result.refreshToken);

            return Ok(result.accessToken);
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
        public async Task<ActionResult<GetUserResponse?>> GetUser([FromQuery] GetUserDTO getUserDTO)
        {
            var result = await user.GetUser(getUserDTO);

            if(result == null) 
                return BadRequest("Пользователь не найден");

            return Ok(result);
        }

        [Authorize]
        [HttpPost("updateUser")]
        public async Task<ActionResult<UpdateUserResponse>> UpdateUser(UpdateUserDTO updateUserDTO)
        {
            var result = await user.UpdateUser(updateUserDTO);

            if (result == null)
                return BadRequest("Пользователь не найден");

            return Ok(result);
        }

        // Установка RefreshToken в HttpOnly
        private void SetRefreshTokenCookie(string refreshToken)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                //Secure = true,
                SameSite = SameSiteMode.Lax,
                Expires = DateTime.UtcNow.AddDays(14),
                Path = "/api/User/"
            };

            Response.Cookies.Append("refreshToken", refreshToken, cookieOptions);
        }

        private void DeleteRefreshToken(string refreshToken)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                //Secure = true,
                SameSite = SameSiteMode.Lax,
                Expires = DateTime.UtcNow.AddDays(-1),
                Path = "/api/User/"
            };

            Response.Cookies.Append("refreshToken", refreshToken, cookieOptions);
        }

        private async Task<Domain.Entities.User?> FindUserById(Guid Id) =>
            await appDbContext.Users.FirstOrDefaultAsync(u => u.Id == Id);
    }
}
