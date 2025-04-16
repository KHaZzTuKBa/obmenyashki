namespace Domain.Entities
{
    public class User
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = default!;
        public string Email { get; set; } = default!;
        public string Phone { get; set; } = default!;
        public string Password { get; set; } = default!;
        public string? ProfileAvatarURL { get; set; } = default!;
        public bool IsOnline { get; set; } = default!;
    }
}
