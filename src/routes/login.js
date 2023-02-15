import connection from "../database.js";
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';

export async function getLogin(req, res) {

    try {
        const { email, password } = req.body;

        const result = await connection.query(`
            SELECT * FROM users WHERE email = $1
        `, [email]);

        const user = result.rows[0];

        if(user && bcrypt.compareSync(password, user.password)) {
            const id = user.id;
            const token = uuid();
            await connection.query(`
                INSERT INTO authentication (token, "userId")
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
            res.send(session.rows[0]).status(200);
        } else {
            res.sendStatus(401);
        }
    } catch {  
        res.sendStatus(500);
    }   
}