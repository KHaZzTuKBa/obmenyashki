﻿using Application.DTOs.ChangeProductStatus;
using Application.DTOs.GetProduct;
using Application.DTOs.GetProductList;
using Application.DTOs.GetUserProducts;
using Application.DTOs.SearchProductsByName;
using Application.DTOs.SetProduct;

namespace Application.Contracts
{
    public interface IProduct
    {
        Task<GetProductListContract?> GetProductList(GetProductListDTO getProductListDTO);
        Task<SetProductContract?> SetProduct(SetProductDTO setProductDTO);
        Task<GetUserProductsContract?> GetUserProducts(GetUserProductsDTO getUserProductsDTO);
        Task<GetProductContract?> GetProduct(GetProductDTO getProductDTO);
        Task<SearchProductsByNameContract?> SearchProductsByName(SearchProductsByNameDTO searchProductsByNameDTO);
        Task<ChangeProductStatusContract?> ChangeProductStatus(ChangeProductStatusDTO changeProductStatusDTO);
    }
}
