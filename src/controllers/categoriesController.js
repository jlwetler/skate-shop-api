import * as categoriesService from "../services/categoriesService.js";

export async function categories(req, res) {
    try {
        const categories = await categoriesService.getCategories();

        res.send(categories).status(200);
    } catch {
        res.sendStatus(500);
    }
}

export async function subCategories(req,res) {
    try {
        const { category } = req.params;

        const subCategories = await categoriesService.getSubCategories(category);

        res.send(subCategories).status(200);
    } catch {
        res.sendStatus(500);
    }
}