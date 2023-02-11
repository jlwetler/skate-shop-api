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


export async function signUpAddress(req, res) {

    try {
        const userSchema = joi.object({
            address: joi.string().min(8).max(40).trim().required(), 
            cep: joi.string().length(8).required(),
            bairro: joi.string().min(3).required(),
            city: joi.string().min(3).required(),
            email: joi.string().min(3).email().required().label('Email') 
        })

        const object = await userSchema.validateAsync(req.body);
        console.log(object);
        const { address, cep, bairro, city, email } = object;

        const emailCheck = await connection.query(`
            SELECT * FROM users WHERE email = $1
        `, [email]);

        if (emailCheck.rows.length === 0) return res.sendStatus(409);

        const userId = emailCheck.rows[0].id;

        await connection.query(`
            INSERT INTO address (address, cep, bairro, city, "userId" )
            VALUES ($1, $2, $3, $4, $5)
        `, [address, cep, bairro, city, userId]);

        res.sendStatus(201);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
}