import connection from "../database.js";

export async function getBrands() {
    const brands = await connection.query(`
        SELECT * FROM brands
    `)
    return brands.rows;
}

export async function getProductBrand(brandId) {
    const brand = await connection.query(`
        SELECT * FROM brands
        WHERE id = $1
    `,[brandId]);
    return brand.rows[0];
}