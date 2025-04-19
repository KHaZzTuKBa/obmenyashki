using Application.Contracts;
using Application.DTOs.GetProductList;
using Application.DTOs.GetUserProducts;
using Application.DTOs.SetProduct;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Query.Internal;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class Product : ControllerBase
    {
        private readonly IProduct product;
        private readonly IConfiguration configuration;

        public Product(IProduct product, AppDbContext appDbContext, IConfiguration configuration)
        {
            this.product = product;
            this.configuration = configuration;
        }

        [Authorize]
        [HttpPost("AddProduct")]
        public async Task<ActionResult<SetProductResponse>> AddProduct(SetProductDTO setProductDTO)
        {
            var result = await product.SetProduct(setProductDTO);

            return Ok(new SetProductResponse("Объявление успешно опубликовано!"));
        }

        [Authorize]
        [HttpGet("GetListOfProducts")]
        public async Task<ActionResult<GetProductListResponse>> GetListOfProducts([FromQuery]GetProductListDTO getProductListDTO)
        {
            var result = await product.GetProductList(getProductListDTO);

            if (result == null || result.Products?.Count == 0 || result.Products?.Count == null)
                return NotFound(new GetProductListResponse(null, "Нет активных объявлений"));

            return Ok(new GetProductListResponse(result.Products, "Без ошибок!!!"));
        }

        [Authorize]
        [HttpGet("GetUserProducts")]
        public async Task<ActionResult<GetUserProductsResponse>> GetUserProducts([FromQuery]GetUserProductsDTO getUserProductsDTO)
        {
            var result = await product.GetUserProducts(getUserProductsDTO);

            if (result == null || result.Products?.Count == 0 || result.Products?.Count == null)
                return new GetUserProductsResponse(null, "У вас нет активных объявлений!");

            return Ok(new GetUserProductsResponse(result.Products, $"У вас {result.Products.Count} активных объявлений"));
        }
    }
}
