using Application.Contracts;
using Application.DTOs.GetProductList;
using Application.DTOs.SetProduct;
using Application.DTOs.GetUserProducts;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using Infrastructure.Migrations;


namespace Infrastructure.Repo
{
    public class ProductRepo : IProduct
    {
        private readonly AppDbContext appDbContext;
        private readonly IConfiguration configuration;

        public ProductRepo(AppDbContext appDbContext, IConfiguration configuration)
        {
            this.appDbContext = appDbContext;
            this.configuration = configuration;
        }

        public async Task<GetProductListContract?> GetProductList(GetProductListDTO getProductListDTO)
        {
            var listOfProduct = await GetProductsRangeAsync(getProductListDTO.BunchNumber, getProductListDTO.BunchSize);

            if (listOfProduct.Count == 0)
                return null;

            var productIds = listOfProduct.Select(p => p.Id).ToList();

            var productImages = await GetProductImagesByProductIdsAsync(productIds);

            var imagesGroupedByProductId = productImages
                .GroupBy(img => img.ProductGuid)
                .ToDictionary(g => g.Key, g => g.Select(img => img.ImageURL).ToList());

            var listOfResponseProduct = new List<ResponseProduct>();

            foreach (var product in listOfProduct)
            {
                // Ищем картинки для текущего продукта в словаре, используя строковое представление Guid
                imagesGroupedByProductId.TryGetValue(product.Id.ToString(), out var imageUrls);

                var responseProduct = new ResponseProduct()
                {
                    Id = product.Id,
                    ProductTitle = product.ProductTitle,
                    ProductDescription = product.ProductDescription,
                    PublishDate = product.PublishDate,
                    TradeFor = product.TradeFor,
                    IsActive = product.IsActive,
                    // Используем найденные URL или пустой список, если вдруг что-то пошло не так
                    // (хотя по условию картинки всегда есть)
                    ImgURLs = imageUrls ?? new List<string>()
                };
                listOfResponseProduct.Add(responseProduct);
            }

            return new GetProductListContract(listOfResponseProduct, await appDbContext.Products.CountAsync());
        }

        public async Task<GetUserProductsContract?> GetUserProducts(GetUserProductsDTO getUserProductsDTO)
        {
            var getProductIds = await GetUserProductIds(getUserProductsDTO.UserId);

            if (getProductIds.Count == 0 || getProductIds == null)
                return null;

            List<Guid> productGuids = getProductIds
                                    .Where(id => !string.IsNullOrEmpty(id))
                                    .Select(id => Guid.Parse(id!))
                                    .ToList();

            if (!productGuids.Any()) return null;

            var listOfProduct = await GetProductsByIds(getProductIds);

            var productImages = await GetProductImagesByProductIdsAsync(productGuids);

            var imagesGroupedByProductId = productImages
               .GroupBy(img => img.ProductGuid)
               .ToDictionary(g => g.Key, g => g.Select(img => img.ImageURL).ToList());

            var listOfResponseProduct = new List<ResponseProduct>();

            foreach (var product in listOfProduct)
            {
                imagesGroupedByProductId.TryGetValue(product.Id.ToString(), out var imageUrls);

                var responseProduct = new ResponseProduct()
                {
                    Id = product.Id,
                    ProductTitle = product.ProductTitle,
                    ProductDescription = product.ProductDescription,
                    PublishDate = product.PublishDate,
                    TradeFor = product.TradeFor,
                    IsActive = product.IsActive,
                    ImgURLs = imageUrls ?? new List<string>()
                };
                listOfResponseProduct.Add(responseProduct);
            }

            return new GetUserProductsContract(listOfResponseProduct);
        }

        public async Task<SetProductContract?> SetProduct(SetProductDTO setProductDTO)
        {
            var product = new Product()
            {
                ProductTitle = setProductDTO.ProductTitle,
                ProductDescription = setProductDTO.ProductDescription,
                PublishDate = DateTime.UtcNow.Date,
                TradeFor = setProductDTO.TradeFor,
                IsActive = true
            };

            await appDbContext.Products.AddAsync(product);
            await appDbContext.SaveChangesAsync();

            var userProductRel = new UserProductRel()
            {
                UserId = setProductDTO.OwnerId,
                ProductId = product.Id.ToString(),
            };

            await appDbContext.UserProductMap.AddAsync(userProductRel);
            await appDbContext.SaveChangesAsync();           

            //добавить работу с сохранением ихображений в объектное хранилище

            return new SetProductContract(userProductRel.ProductId);
        }

        public async Task<List<Product>> GetProductsRangeAsync(int bunchNumber, int bunchSize)
        {
            int itemsToSkip = (bunchNumber - 1) * bunchSize;

            return await appDbContext.Products
                .OrderByDescending(p => p.PublishDate)
                .Skip(itemsToSkip)
                .Take(bunchSize)
                .ToListAsync();
        }

        private async Task<List<ProductImage>> GetProductImagesByProductIdsAsync(List<Guid> productIds)
        {
            if (productIds == null || !productIds.Any())
                return new List<ProductImage>();

            var productIdsAsString = productIds.Select(id => id.ToString()).ToList();

            return await appDbContext.ProductImages
                .Where(img => productIdsAsString.Contains(img.ProductGuid))
                .ToListAsync();
        }

        public async Task<List<string?>> GetUserProductIds(string userId)
        {
            return await appDbContext.UserProductMap
                .Where(up => up.UserId == userId)
                .Select(up => up.ProductId)
                .ToListAsync();
        }

        public async Task<List<Product>> GetProductsByIds(List<string> productIds)
        {
            return await appDbContext.Products
                .Where(p => productIds.Contains(p.Id.ToString()))
                .ToListAsync();
        }
    }
}
