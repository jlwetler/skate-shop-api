import connection from "../database.js";

export async function insertUserData(name, lastName, email, hashPassword) {
    await connection.query(`
        INSERT INTO users (name, "lastName", email, password)
        VALUES ($1, $2, $3, $4)
    `, [name, lastName, email, hashPassword]);
}