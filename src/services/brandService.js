import * as brandsRepository from "../repositories/brandsRepository.js";

export async function getBrands() {
    const brands = await brandsRepository.getBrands();

    return brands;
}

export async function getProductBrand(brandId) {
    const brand = await brandsRepository.getProductBrand(brandId);

    return brand;
}