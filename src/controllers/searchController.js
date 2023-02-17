import { getSearch } from "../repositories/searchRepository.js";

export async function search(req, res) {
    try {
        let { search } = req.params;
        
        const searchProducts = await getSearch(search);

        res.send(searchProducts).status(200);

    } catch {
        res.sendStatus(500);
    }
}