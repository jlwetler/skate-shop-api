import connection from "../database.js";

export async function getCategories() {
    const categories = await connection.query(`
        SELECT * FROM categories
    `);
    return categories.rows;
}

export async function getCategoryId(category) {
    const result = await connection.query(`
        SELECT id FROM categories
        WHERE name = $1;
    `, [category]);

    return result.rows[0].id;
}

export async function getSubCategories(categoryId) {
    const subCategories = await connection.query(`
        SELECT id, name FROM "subCategories"
        WHERE "categoryId" = $1
    `, [categoryId]);

    return subCategories.rows;
}