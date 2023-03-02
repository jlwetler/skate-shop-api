import * as productsService from "../services/productsService.js";

export async function products(req, res) {
    try {
        const { category } = req.params;
        
        const products = await productsService.getProducts(category);
        
        res.send(products).status(200);
    } catch {
        res.sendStatus(500);
    }
}

export async function filterProducts(req, res) {
    try {
        const products = await productsService.searchProducts(req.params, req.query)

        res.send(products).status(200);
    } catch {
        res.sendStatus(500);
    }
}


