import connection from '../database.js';

export async function getBrands(req, res) {
    try {
        const brands = await connection.query(`
            SELECT * FROM brands
        `)
        res.send(brands.rows).status(200);
    } catch {
        res.sendStatus(500);
    }
}

export async function getProductBrand(req, res) {
    try {
        const { brandId } = req.params;
        const brand = await connection.query(`
        SELECT * FROM brands
        WHERE id = $1
    `,[brandId])

    res.send(brand.rows[0]).status(200);
    } catch {
        res.sendStatus(500);
    }
}