using Application.Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Application.DTOs;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class User : ControllerBase
    {
        private readonly IUser user;

        public User(IUser user) 
        {
            this.user = user;
        }

        [HttpPost("login")]
        public async Task<ActionResult<LoginResponse>> LoginUser(LoginDTO loginDTO)
        {
            var resulr = await user.LoginUser(loginDTO);

            return Ok(resulr);
        }

        [HttpPost("registration")]
        public async Task<ActionResult<LoginResponse>> RegisterUser(RegisterDTO registerDTO)
        {
            var resulr = await user.RegisterUser(registerDTO);

            return Ok(resulr);
        }
    }
}
