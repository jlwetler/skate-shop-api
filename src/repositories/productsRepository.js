import connection from "../database.js";

export async function getProducts(category) {
    const products = await connection.query(`
        SELECT products.*, brands.image AS "brandImage" FROM products 
        JOIN categories
        ON  products."categoryId" = categories.id
        JOIN brands
        ON products."brandId" = brands.id
        WHERE categories.name = $1 
    `, [category]);

    return products.rows;
}

export async function getFilteredProducts(subCategory, subCategoryQuery, brandsQuery, orderBy, queryArray) {
    const products = await connection.query(`
        SELECT products.* FROM products 
        JOIN categories
        ON products."categoryId" = categories.id
        ${subCategory ? 'JOIN "subCategories" ON products."subCategoryId" = "subCategories".id' : ''}
        JOIN brands
        ON products."brandId" = brands.id
        WHERE categories.name = $1 AND 
        products.price < $2
        ${subCategoryQuery} 
        ${brandsQuery}
        ${orderBy}
    `, queryArray);

    return products.rows;
}