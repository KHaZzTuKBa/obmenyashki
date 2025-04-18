namespace Domain.Entities
{
    public class UserProductRel
    {
        public Guid Id { get; set; }
        public string? UserId { get; set; } = default!;
        public string? ProductId { get; set; } = default!;
    }
}
