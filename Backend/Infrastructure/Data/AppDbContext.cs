    using Domain.Entities;
    using Microsoft.EntityFrameworkCore;

    namespace Infrastructure.Data
    {
        public class AppDbContext : DbContext
        {
            public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ProductImage>(entity =>
            {
                entity.Property(e => e.ProductGuid)
                      .IsRequired()
                      .HasMaxLength(36)
                      .HasColumnType("varchar(36)");

            });
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductImage> ProductImages { get; set; }
        public DbSet<UserProductRel> UserProductMap { get; set; }
        }
    }
