import * as categoriesRepository from "../repositories/categoriesRepository.js";

export async function getCategories() {
    const categories = await categoriesRepository.getCategories();

    return categories;
}

export async function getSubCategories(category) {
    const categoryId = await categoriesRepository.getCategoryId(category);

    const subCategories = await categoriesRepository.getSubCategories(categoryId);

    return subCategories;
}