import connection from "../database.js";

export async function getSearch(req, res) {
    try {
        let { search } = req.params;
        
        search = `% ${search.toUpperCase()}%`;
        
        const products = await connection.query(`
            SELECT products.*, brands.image AS "brandImage" FROM products 
            JOIN categories
            ON  products."categoryId" = categories.id
            JOIN brands
            ON products."brandId" = brands.id
            WHERE products.name LIKE $1 
        `, [search])
        res.send(products.rows).status(200);

    } catch {
        res.sendStatus(500);
    }
}