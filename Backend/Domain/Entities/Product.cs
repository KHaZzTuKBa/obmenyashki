namespace Domain.Entities
{
    public class Product
    {
        public Guid Id { get; set; }
        public string? ProductTitle { get; set; } = default!;
        public string? ProductDescription { get; set; } = default!;
        public DateTime? PublishDate { get; set; } = default!;
        public string? TradeFor { get; set; } = default!;
        public bool? IsActive { get; set; } = default!;
    }
}
