import connection from "../../src/database";
import app from '../../src/app';
import supertest from 'supertest';

export async function finishOrderFactory(token) {
    await connection.query(`
        INSERT INTO products 
        (name, stock, "categoryId", "subCategoryId", "brandId", price, image)
        VALUES ('Product Name', 3, 1, 1, 1, 10000, 'link')
    `);
    const productId = await connection.query(`
        SELECT id from products
        WHERE name = 'Product Name'
    `)
    const id = productId.rows[0].id;

    const cartInfo = [{ id, quantity: 1, price: 10000}];
      
    const orderPrice = cartInfo[0].price;

    const body = { cartInfo, orderPrice }

    const response = await supertest(app)
        .post("/finish-order")
        .send(body)
        .set('Authorization', `Bearer ${token}`);

    return response;
}