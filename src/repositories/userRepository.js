import connection from "../database.js";

export async function findUser(email) {
    const result = await connection.query(`
        SELECT * FROM users 
        WHERE email = $1
    `, [email]);

    return result.rows[0];
}

export async function insertUserData(name, lastName, email, hashPassword) {
    await connection.query(`
        INSERT INTO users (name, "lastName", email, password)
        VALUES ($1, $2, $3, $4)
    `, [name, lastName, email, hashPassword]);
}