using Application.Contracts;
using Application.DTOs.GetProduct;
using Application.DTOs.GetProductList;
using Application.DTOs.GetUserProducts;
using Application.DTOs.SearchProductsByName;
using Application.DTOs.SetProduct;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Domain.Entities;
using Application.DTOs.ChangeProductStatus;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class Product : ControllerBase
    {
        private readonly IProduct product;
        private readonly IConfiguration configuration;

        public Product(IProduct product, IConfiguration configuration)
        {
            this.product = product;
            this.configuration = configuration;
        }

        [Authorize]
        [HttpPost("AddProduct")]
        public async Task<ActionResult<SetProductResponse>> AddProduct(SetProductDTO setProductDTO)
        {
            var result = await product.SetProduct(setProductDTO);

            if (result == null)
                return BadRequest(new SetProductResponse("Возникла ошибка при добавлении объявления"));

            return Ok(new SetProductResponse("Объявление успешно опубликовано!"));
        }

        [Authorize]
        [HttpGet("GetListOfProducts")]
        public async Task<ActionResult<GetProductListResponse>> GetListOfProducts([FromQuery]GetProductListDTO getProductListDTO)
        {
            var result = await product.GetProductList(getProductListDTO);

            if (result == null || result.Products?.Count == 0 || result.Products?.Count == null)
                return NotFound(new GetProductListResponse(new List<ResponseProduct>(), 0, "Нет активных объявлений!"));

            return Ok(new GetProductListResponse(result.Products, result.ProductsAmount, "Лента объявлений загружена!"));
        }

        [Authorize]
        [HttpGet("GetUserProducts")]
        public async Task<ActionResult<GetUserProductsResponse>> GetUserProducts([FromQuery]GetUserProductsDTO getUserProductsDTO)
        {
            var result = await product.GetUserProducts(getUserProductsDTO);

            if (result == null || result.Products?.Count == 0 || result.Products?.Count == null)
                return new GetUserProductsResponse(new List<ResponseProduct>(), "У вас нет активных объявлений!");

            return Ok(new GetUserProductsResponse(result.Products, $"Активных объявлений - {result.Products.Count}"));
        }

        [Authorize]
        [HttpGet("GetProductById")]
        public async Task<ActionResult<GetProductResponse>> GetProductById([FromQuery]GetProductDTO getProductDTO)
        {
            var result = await product.GetProduct(getProductDTO);

            if (result == null || result.Product == null || result.OwnerId == null)
                return NotFound(new GetProductResponse(null, null, "Объявление не найдено!"));

            return Ok(new GetProductResponse(result.Product, result.OwnerId, "Объявление успешно найдено!"));
        }

        [Authorize]
        [HttpGet("SearchProductsByName")]
        public async Task<ActionResult<SearchProductsByNameResponse>> SearchProductsByName([FromQuery] SearchProductsByNameDTO searchProductsByNameDTO)
        {
            var result = await product.SearchProductsByName(searchProductsByNameDTO);

            if (result == null || result.Products == null || !result.Products.Any())
                return NotFound(new SearchProductsByNameResponse(new List<ResponseProduct>(), 0, "Объявления по указанному запросу не найдены!"));

            return Ok(new SearchProductsByNameResponse(result.Products, result.Products.Count, $"Найдено {result.Products.Count} объявлений по вашему запросу"));
        }

        [Authorize]
        [HttpPatch("ChangeProductStatus")]
        public async Task<ActionResult<ChangeProductStatusResponse>> ChangeProductStatus(ChangeProductStatusDTO changeProductStatusDTO)
        {
            var result = await product.ChangeProductStatus(changeProductStatusDTO);

            if(result == null)
                return BadRequest(new ChangeProductStatusResponse("Произошла ошибка при выполнении операции!"));

            return Ok(new ChangeProductStatusResponse(result.Message));
        }
    }
}
