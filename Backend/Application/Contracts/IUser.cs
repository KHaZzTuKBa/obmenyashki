using Application.DTOs.GetUser;
using Application.DTOs.Login;
using Application.DTOs.RefreshToken;
using Application.DTOs.Registration;
using Application.DTOs.UpdateUser;

namespace Application.Contracts
{
    public interface IUser
    {
        Task<RegisterContract?> RegisterUser(RegisterDTO regosterDTO);
        Task<LoginContract?> LoginUser(LoginDTO loginDTO);
        Task<RefreshTokenContract?> RefreshToken(string oldRefreshToken);
        Task<GetUserContract?> GetUser(GetUserDTO getUserDTO);
        Task<UpdateUserContract?> UpdateUser(UpdateUserDTO updateUserDTO);
    }
}
