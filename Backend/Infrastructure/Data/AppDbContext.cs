    using Domain.Entities;
    using Microsoft.EntityFrameworkCore;

    namespace Infrastructure.Data
    {
        public class AppDbContext : DbContext
        {
            public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Хорошая практика - вызвать базовую реализацию, если она есть
            // (в данном случае у DbContext она пустая, но это не помешает)
            base.OnModelCreating(modelBuilder);

            // Начинаем конфигурацию для сущности ProductImage
            modelBuilder.Entity<ProductImage>(entity =>
            {
                // Здесь можно добавить другие конфигурации для ProductImage, если нужно
                // Например, указать первичный ключ, если он не называется Id

                // --- Вот важная часть для твоего случая ---
                // Указываем, что свойство ProductGuid...
                entity.Property(e => e.ProductGuid)
                      .IsRequired() // Скорее всего, это поле обязательное (не может быть NULL)
                      .HasMaxLength(36) // Guid в стандартном строковом представлении имеет 36 символов (включая дефисы)
                      .HasColumnType("varchar(36)"); // Явно указываем тип столбца в PostgreSQL.
                                                     // Альтернатива: .HasColumnType("text"), если ты не уверен в длине
                                                     // или используешь другой формат. "varchar(36)" более точен для Guid.

                // Если бы ProductGuid был настоящим Guid, конфигурация была бы проще:
                // entity.Property(e => e.ProductGuid).HasColumnType("uuid"); // Для PostgreSQL
            });

            // Здесь можно добавить конфигурации для других сущностей, если необходимо
            // modelBuilder.Entity<User>(entity => { ... });
            // modelBuilder.Entity<Product>(entity => { ... });
            // modelBuilder.Entity<UserProductRel>(entity => { ... });

        }

        public DbSet<User> Users { get; set; }
            public DbSet<Product> Products { get; set; }
            public DbSet<ProductImage> ProductImages { get; set; }
            public DbSet<UserProductRel> UserProductMap { get; set; }
        }
    }
