using Application.Contracts;
using Microsoft.AspNetCore.Mvc;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Application.DTOs.GetUser;
using Application.DTOs.Login;
using Application.DTOs.RefreshToken;
using Application.DTOs.Registration;
using Application.DTOs.UpdateUser;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class User : ControllerBase
    {
        private readonly IUser user;
        private readonly IConfiguration configuration;

        public User(IUser user, AppDbContext appDbContext, IConfiguration configuration) 
        {
            this.user = user;
            this.configuration = configuration;
        }

        [HttpPost("login")]
        public async Task<ActionResult<LoginResponse>> LoginUser(LoginDTO loginDTO)
        {
            var result = await user.LoginUser(loginDTO);

            if (result == null)
                return NotFound(new LoginResponse(null, null, "Неправильный логин или пароль"));

            SetRefreshTokenCookie(result.RefreshToken);

            return Ok(new LoginResponse(result.User, result.AccessToken, "Вход успешен!"));
        }

        [HttpPost("registration")]
        public async Task<ActionResult<RegisterResponse>> RegisterUser(RegisterDTO registerDTO)
        {
            var result = await user.RegisterUser(registerDTO);

            if (result == null)
                 return Unauthorized(new RegisterResponse(null, null, "Такие почта или телефон уже используются"));           

            SetRefreshTokenCookie(result.RefreshToken);

            return Ok(new RegisterResponse(result.User, result.AccessToken, "Вход успешен!"));
        }

        [HttpGet("refreshToken")]
        public async Task<ActionResult<RefreshTokenResponse>> Refresh()
        {
            var refreshToken = Request.Cookies["refreshToken"];

            if(refreshToken == null)
                return Unauthorized(new RefreshTokenResponse(null));

            var result = await user.RefreshToken(refreshToken);

            if (result == null)
                return Unauthorized(new RefreshTokenResponse(null));

            SetRefreshTokenCookie(result.RefreshToken);

            return Ok(new RefreshTokenResponse(result.AccessToken));
        }

        [Authorize]
        [HttpGet("logout")]
        public ActionResult Logout()
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
                return BadRequest(new GetUserResponse(null, "Пользователь не найден"));

            return Ok(new GetUserResponse(result.User, "Успешно"));
        }

        [Authorize]
        [HttpPost("updateUser")]
        public async Task<ActionResult<UpdateUserResponse>> UpdateUser(UpdateUserDTO updateUserDTO)
        {
            var result = await user.UpdateUser(updateUserDTO);

            if (result == null)
                return BadRequest(new UpdateUserResponse(null, "Пользователь не найден"));

            return Ok(new UpdateUserResponse(result.User, "Успешно"));
        }

        [Authorize]
        [HttpGet("isAuth")]
        public ActionResult IsAuth ()
        {
            return Ok(); 
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
    }
}
