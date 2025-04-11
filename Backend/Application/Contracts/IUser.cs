using Application.DTOs;

namespace Application.Contracts
{
    public interface IUser
    {
        Task<RegisterResponse> RegisterUser(RegisterDTO regosterDTO);
        Task<LoginResponse> LoginUser(LoginDTO loginDTO);
    }
}
