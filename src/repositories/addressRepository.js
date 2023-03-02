import connection from "../database.js";

export async function insertAddressData(street, cep, district, city, userId, phone) {
    await connection.query(`
        INSERT INTO address (street, cep, district, city, "userId", phone )
        VALUES ($1, $2, $3, $4, $5, $6)
    `, [street, cep, district, city, userId, phone]);
}