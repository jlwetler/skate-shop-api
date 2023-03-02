import * as searchRepository from "../repositories/searchRepository.js";

export async function searchProducts(search) {

    const searchProducts = await searchRepository.getSearch(search);

    return searchProducts;
}