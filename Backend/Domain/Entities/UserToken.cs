namespace Domain.Entities
{
    public class UserToken
    {
        public Guid Id { get; set; }
        public string UserId { get; set; } = default!;
        public string? RefreshToken { get; set; } = default!;
        public DateTime ExpiresDate { get; set; } = default!;
    }
}
