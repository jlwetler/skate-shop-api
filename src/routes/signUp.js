import connection from "../database.js";
import joi from 'joi';
import bcrypt from 'bcrypt';

export async function signUp(req, res) {

    try {
        const userSchema = joi.object({
            name: joi.string().min(3).max(30).trim().required(), 
            email: joi.string().min(3).email().required().label('Email') ,
            password: joi.string().min(4).required()
        })

        const object = await userSchema.validateAsync(req.body);

        const { name, email, password } = object;

        const emailCheck = await connection.query(`
            SELECT * FROM users WHERE email = $1
        `, [email]);

        if (emailCheck.rows.length !== 0) return res.sendStatus(409);

        const hashPassword = bcrypt.hashSync(password, 12);

        await connection.query(`
            INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3)
        `, [name, email, hashPassword]);

        res.sendStatus(201);
    } catch {
        res.sendStatus(500);
    }
}