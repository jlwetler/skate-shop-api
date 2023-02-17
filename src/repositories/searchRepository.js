import connection from "../database.js";

export async function getSearch(search) {
    search = `%${search.toUpperCase()}%`;
        
    const products = await connection.query(`
        SELECT products.*, brands.image AS "brandImage" FROM products 
        JOIN categories
        ON  products."categoryId" = categories.id
        JOIN brands
        ON products."brandId" = brands.id
        WHERE products.name LIKE $1 
    `, [search]);

    return products.rows;
}