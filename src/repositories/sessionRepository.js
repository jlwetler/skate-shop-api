import connection from "../database.js";

export async function createSession(id, token) {
    await connection.query(`
        INSERT INTO authentication 
        (token, "userId")
        VALUES ($1, $2)            
    `,[token, id]);

    const session = await connection.query(`
        SELECT users.id, users.name, users."lastName", users.email, authentication.token, address.*
        FROM users JOIN authentication
        ON users.id = authentication."userId"
        JOIN address
        ON users.id = address."userId"
        WHERE users.id = $1
    `, [id]);

    return session;
}