import connection from "../database.js";

export async function getCategories(req, res) {
    try {
        const categories = await connection.query(`
            SELECT * FROM categories
        `)
        res.send(categories.rows).status(200);
    } catch {
        res.sendStatus(500);
    }
}

export async function getSubCategories(req,res) {
    try {
        const { category } = req.params;
       
        const result = await connection.query(`
            SELECT id FROM categories
            WHERE name = $1;
        `, [category]);

        const categoryId = result.rows[0].id;

        const subCategories = await connection.query(`
            SELECT id, name FROM "subCategories"
            WHERE "categoryId" = $1
        `, [categoryId]);

        res.send(subCategories.rows).status(200);
    } catch {
        res.sendStatus(500);
    }
}