namespace Domain.Entities
{
    public class ProductImage
    {
        public Guid Id { get; set; }
        public string ProductGuid { get; set; } = default!;
        public string ImageURL { get; set; } = default!;
    }
}
