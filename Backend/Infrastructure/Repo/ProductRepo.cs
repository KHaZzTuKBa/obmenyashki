using Application.Contracts;
using Application.DTOs.GetProductList;
using Application.DTOs.SetProduct;
using Application.DTOs.GetUserProducts;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;


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
            {
                new GetProductListContract(null);
            }

            return new GetProductListContract(listOfProduct);
        }

        public async Task<GetUserProductsContract?> GetUserProducts(GetUserProductsDTO getUserProductsDTO)
        {
            var getProductIds = await GetUserProductIds(getUserProductsDTO.UserId);

            if (getProductIds.Count == 0 || getProductIds == null)
                return new GetUserProductsContract(null);

            var products = await GetProductsByIds(getProductIds);

            return new GetUserProductsContract(products);
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
