import { getCategories, getCategoryId, getSubCategories } from "../repositories/categoriesRepository.js";

export async function categories(req, res) {
    try {
        const categories = await getCategories();

        res.send(categories).status(200);
    } catch {
        res.sendStatus(500);
    }
}

export async function subCategories(req,res) {
    try {
        const { category } = req.params;

        const categoryId = await getCategoryId(category);

        const subCategories = await getSubCategories(categoryId);

        res.send(subCategories).status(200);
    } catch {
        res.sendStatus(500);
    }
}