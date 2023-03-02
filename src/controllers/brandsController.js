import * as brandService from "../services/brandService.js"

export async function brands(req, res) {
    try {
        const brands = await brandService.getBrands();

        res.send(brands).status(200);
    } catch {
        res.sendStatus(500);
    }
}

export async function productBrand(req, res) {
    try {
        const { brandId } = req.params;
        
        const brand = await brandService.getProductBrand(brandId);

        res.send(brand).status(200);
    } catch {
        res.sendStatus(500);
    }
}