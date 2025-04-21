namespace Domain.Entities
{
    public class ResponseProduct
    {
        public Guid Id { get; set; }
        public string? ProductTitle { get; set; } = default!;
        public string? ProductDescription { get; set; } = default!;
        public DateTime? PublishDate { get; set; } = default!;
        public string? TradeFor { get; set; } = default!;
        public bool? IsActive { get; set; } = default!;
        public List<string>? ImgURLs{ get; set; } = default!;
    }
}
