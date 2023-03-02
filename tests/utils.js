import connection from "../src/database"

export const userBody = {
    name: 'Fulano',
    lastName: 'DiTal',
    email: 'fulano@email.com',
    password: '123456'
}

export const addressBody = {
    street: 'Avenida street',
    cep: '12345678',
    district: 'district',
    city: 'city',
    phone: '12345678910',
    email: 'fulano@email.com'
}

export async function cleanDatabase() {
    await connection.query(`TRUNCATE address RESTART IDENTITY`);
    await connection.query(`TRUNCATE authentication RESTART IDENTITY`);
    await connection.query(`TRUNCATE users RESTART IDENTITY`);
    await connection.query(`TRUNCATE products RESTART IDENTITY`);
    await connection.query(`TRUNCATE purchases RESTART IDENTITY`);
    await connection.query(`TRUNCATE product_purchase RESTART IDENTITY`);
}

export async function endConnection() {
    await connection.end();
}