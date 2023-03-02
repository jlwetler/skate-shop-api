import * as searchService from '../services/searchService.js'

export async function search(req, res) {
    try {
        let { search } = req.params;
        
        const searchProducts = await searchService.searchProducts(search);

        res.send(searchProducts).status(200);

    } catch {
        res.sendStatus(500);
    }
}