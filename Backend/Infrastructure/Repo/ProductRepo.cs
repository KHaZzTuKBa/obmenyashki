using Application.Contracts;
using Application.DTOs.GetProductList;
using Application.DTOs.SetProduct;
using Application.DTOs.GetUserProducts;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using Infrastructure.Migrations;
using Infrastructure.Models;
using Microsoft.Extensions.Logging;
using Minio;
using Minio.DataModel.Args;
using Minio.Exceptions;
using Microsoft.Extensions.Options;
using Application.DTOs.GetProduct;
using Application.DTOs.SearchProductsByName;
using Microsoft.EntityFrameworkCore.ChangeTracking.Internal;
using Application.DTOs.ChangeProductStatus;


namespace Infrastructure.Repo
{
    public class ProductRepo : IProduct
    {
        private readonly AppDbContext appDbContext;
        private readonly IMinioClient minioClient;
        private readonly MinioOptions minioOptions;
        private readonly ILogger<ProductRepo> logger;

        public ProductRepo(AppDbContext appDbContext, IMinioClient minioClient, IOptions<MinioOptions> minioOptions, ILogger<ProductRepo> logger)
        {
            this.appDbContext = appDbContext;
            this.minioClient = minioClient;
            this.minioOptions = minioOptions.Value;
            this.logger = logger;
        }

        public async Task<GetProductListContract?> GetProductList(GetProductListDTO getProductListDTO)
        {
            var listOfProduct = await GetProductsRangeAsync(getProductListDTO.BunchNumber, getProductListDTO.BunchSize);

            if (listOfProduct == null || !listOfProduct.Any())
                return null;

            var productIds = listOfProduct.Select(p => p.Id).ToList();

            var productIdsAsString = listOfProduct.Select(p => p.Id.ToString()).ToList();

            var allProductImages = await appDbContext.ProductImages.AsNoTracking().ToListAsync();
            var productImages = allProductImages.Where(img => productIdsAsString.Contains(img.ProductGuid)).ToList();

            var imagesByProductGuid = productImages
                                        .GroupBy(img => img.ProductGuid)
                                        .ToDictionary(g => g.Key, g => g.Select(img => img.ImageURL).ToList());

            var listOfResponseProduct = new List<ResponseProduct>();

            foreach (var product in listOfProduct)
            {
                imagesByProductGuid.TryGetValue(product.Id.ToString(), out var imgUrls);

                var responseProduct = new ResponseProduct()
                {
                    Id = product.Id,
                    ProductTitle = product.ProductTitle,
                    ProductDescription = product.ProductDescription,
                    PublishDate = product.PublishDate,
                    TradeFor = product.TradeFor,
                    IsActive = product.IsActive,
                    ImgURLs = imgUrls ?? new List<string>()
                };
                listOfResponseProduct.Add(responseProduct);
            }

            var totalCount = await appDbContext.Products.CountAsync();

            return new GetProductListContract(listOfResponseProduct, totalCount);
        }

        public async Task<GetUserProductsContract?> GetUserProducts(GetUserProductsDTO getUserProductsDTO)
        {
            var productIdsFromMap = await GetUserProductIds(getUserProductsDTO.UserId);

            if (productIdsFromMap == null)
                return null;

            if (!productIdsFromMap.Any())
                return null;

            var listOfProduct = await GetProductsByIds(productIdsFromMap!);

            if (listOfProduct == null || !listOfProduct.Any())
                return null;

            var productIdsAsString = listOfProduct.Select(p => p.Id.ToString()).ToList();

            var productImages = await appDbContext.ProductImages
                                     .Where(img => productIdsAsString.Contains(img.ProductGuid))
                                     .AsNoTracking()
                                     .ToListAsync();

            var imagesByProductGuid = productImages
                                        .GroupBy(img => img.ProductGuid)
                                        .ToDictionary(g => g.Key, g => g.Select(img => img.ImageURL).ToList());



            var listOfResponseProduct = new List<ResponseProduct>();

            foreach (var product in listOfProduct)
            {
                imagesByProductGuid.TryGetValue(product.Id.ToString(), out var imgUrls);

                var responseProduct = new ResponseProduct()
                {
                    Id = product.Id,
                    ProductTitle = product.ProductTitle,
                    ProductDescription = product.ProductDescription,
                    PublishDate = product.PublishDate,
                    TradeFor = product.TradeFor,
                    IsActive = product.IsActive,
                    ImgURLs = imgUrls ?? new List<string>()
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

            string productIdString = product.Id.ToString();

            var userProductRel = new UserProductRel()
            {
                UserId = setProductDTO.OwnerId,
                ProductId = productIdString,
            };

            await appDbContext.UserProductMap.AddAsync(userProductRel);
            await appDbContext.SaveChangesAsync();

            var uploadedImageUrls = new List<string>();

            try
            {
                var beArgs = new BucketExistsArgs().WithBucket(minioOptions.BucketName);
                logger.LogInformation("Checking if bucket {BucketName} exists...", minioOptions.BucketName);
                bool found = await minioClient.BucketExistsAsync(beArgs);
                logger.LogInformation("Bucket {BucketName} exists: {Found}", minioOptions.BucketName, found);
                if (!found)
                {
                    logger.LogWarning("Bucket {BucketName} not found during SetProduct. Attempting to create.", minioOptions.BucketName);
                    var mbArgs = new MakeBucketArgs().WithBucket(minioOptions.BucketName);
                    await minioClient.MakeBucketAsync(mbArgs);
                    logger.LogInformation("Bucket {BucketName} created.", minioOptions.BucketName);
                }
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error checking or creating bucket {BucketName} during SetProduct", minioOptions.BucketName);
                return null;
            }

            if (setProductDTO.Images != null && setProductDTO.Images.Any())
            {
                foreach (var imageFile in setProductDTO.Images)
                {
                    if (imageFile.Length == 0) continue;

                    // Генерируем уникальное имя для объекта в MinIO
                    var objectName = $"products/{productIdString}/{Guid.NewGuid()}{Path.GetExtension(imageFile.FileName)}";

                    try
                    {
                        // Копируем файл в MemoryStream
                        using var memoryStream = new MemoryStream();
                        await imageFile.CopyToAsync(memoryStream);
                        memoryStream.Position = 0; // Сбрасываем позицию

                        // Готовим аргументы для загрузки
                        var putObjectArgs = new PutObjectArgs()
                            .WithBucket(minioOptions.BucketName)
                            .WithObject(objectName)
                            .WithStreamData(memoryStream)
                            .WithObjectSize(memoryStream.Length)
                            .WithContentType(imageFile.ContentType);
                        logger.LogInformation(putObjectArgs.ToString());

                        // Загружаем в MinIO
                        await minioClient.PutObjectAsync(putObjectArgs);
                        logger.LogInformation(minioOptions.BucketName);
                        logger.LogInformation(minioOptions.UseSSL.ToString());
                        logger.LogInformation("Uploaded image {ObjectName} to bucket {BucketName}", objectName, minioOptions.BucketName);

                        //var imageUrl = $"{(minioOptions.UseSSL ? "https" : "http")}://{minioOptions.Endpoint}/{minioOptions.BucketName}/{objectName}";
                        var imageUrl = $"{(minioOptions.UseSSL ? "https" : "http")}://localhost:9000/{minioOptions.BucketName}/{objectName}";

                        uploadedImageUrls.Add(imageUrl);

                        var productImage = new ProductImage
                        {
                            ProductGuid = productIdString,
                            ImageURL = imageUrl
                        };

                        await appDbContext.ProductImages.AddAsync(productImage);
                    }


                    catch (MinioException e)
                    {
                        logger.LogError(e, "Minio Error uploading file {FileName} as {ObjectName}", imageFile.FileName, objectName);
                        return null;
                    }
                    catch (Exception e)
                    {
                        logger.LogError(e, "Unexpected error uploading file {FileName} as {ObjectName}", imageFile.FileName, objectName);
                        return null;
                    }
                }

                await appDbContext.SaveChangesAsync();

            }

            return new SetProductContract(userProductRel.ProductId);
        }

        public async Task<GetProductContract?> GetProduct(GetProductDTO getProductDTO)
        {
            if (!Guid.TryParse(getProductDTO.ProductId, out var productIdGuid))
            {
                logger.LogWarning("Invalid ProductId format provided: {ProductId}", getProductDTO.ProductId);
                return null;
            }

            var product = await appDbContext.Products
                                        .AsNoTracking()
                                        .FirstOrDefaultAsync(p => p.Id == productIdGuid);

            if (product == null)
            {
                logger.LogInformation("Product with ID {ProductId} not found.", productIdGuid);
                return null;
            }

            string productIdString = getProductDTO.ProductId;
            var imgUrls = await appDbContext.ProductImages
                                         .Where(img => img.ProductGuid == productIdString)
                                         .Select(img => img.ImageURL)
                                         .AsNoTracking()
                                         .ToListAsync();

            var productContract = new ResponseProduct() {
                Id = product.Id,
                ProductTitle = product.ProductTitle,
                ProductDescription = product.ProductDescription,
                PublishDate = product.PublishDate,
                TradeFor = product.TradeFor,
                IsActive = product.IsActive,
                ImgURLs = imgUrls ?? new List<string>()
            };

            var userProductRel = await appDbContext.UserProductMap.FirstOrDefaultAsync(pr => pr.ProductId == productIdString);

            return new GetProductContract(productContract, userProductRel?.UserId);
        }

        public async Task<SearchProductsByNameContract?> SearchProductsByName(SearchProductsByNameDTO searchDto)
        {
            int itemsToSkip = (searchDto.BunchNumber - 1) * searchDto.BunchSize;
            string searchTerm = searchDto.ProductName!.Trim();

            try
            {
                var foundProducts = await appDbContext.Products
                    .Where(p => p.ProductTitle!.ToLower().Contains(searchTerm.ToLower()) && p.IsActive == true)
                    .OrderByDescending(p => p.PublishDate)
                    .Skip(itemsToSkip)
                    .Take(searchDto.BunchSize)
                    .AsNoTracking()
                    .ToListAsync();

                if (foundProducts == null || !foundProducts.Any())
                {
                    logger.LogInformation("No products found matching search term: {SearchTerm}", searchTerm);
                    return null;
                }

                var productIdsAsString = foundProducts.Select(p => p.Id.ToString()).ToList();

                var productImages = await appDbContext.ProductImages
                                         .Where(img => productIdsAsString.Contains(img.ProductGuid))
                                         .AsNoTracking()
                                         .ToListAsync();

                var imagesByProductGuid = productImages
                                            .GroupBy(img => img.ProductGuid)
                                            .ToDictionary(g => g.Key, g => g.Select(img => img.ImageURL).ToList());

                var listOfResponseProduct = new List<ResponseProduct>();
                foreach (var product in foundProducts)
                {
                    imagesByProductGuid.TryGetValue(product.Id.ToString(), out var imgUrls);

                    var responseProduct = new ResponseProduct()
                    {
                        Id = product.Id,
                        ProductTitle = product.ProductTitle,
                        ProductDescription = product.ProductDescription,
                        PublishDate = product.PublishDate,
                        TradeFor = product.TradeFor,
                        IsActive = product.IsActive,
                        ImgURLs = imgUrls ?? new List<string>()
                    };
                    listOfResponseProduct.Add(responseProduct);
                }

                return new SearchProductsByNameContract(listOfResponseProduct);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error occurred during SearchProductsByName for term: {SearchTerm}", searchTerm);
                return null;
            }
        }

        public async Task<ChangeProductStatusContract?> ChangeProductStatus(ChangeProductStatusDTO changeProductStatusDTO)
        {
            var product = await appDbContext.Products.FirstOrDefaultAsync(p => p.Id == Guid.Parse(changeProductStatusDTO.ProductId!));

            if(product == null)
                return null;

            product.IsActive = changeProductStatusDTO.IsActive;

            await appDbContext.SaveChangesAsync();

            return new ChangeProductStatusContract("Статус товара успешно изменён");
        }

        public async Task<List<Product>> GetProductsRangeAsync(int bunchNumber, int bunchSize)
        {
            int itemsToSkip = (bunchNumber - 1) * bunchSize;

            return await appDbContext.Products
                .Where(p => p.IsActive == true)
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
