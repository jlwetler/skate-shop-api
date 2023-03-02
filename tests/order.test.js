import '../src/setup.js';
import app from '../src/app.js';
import supertest from 'supertest';
import connection from '../src/database.js';
import { tokenFactory } from './factories/authenticationFactories.js';
import { finishOrderFactory } from './factories/orderFactories.js';

describe("GET /get-orders", () => {
    it("should respond with status 401 when token is invalid", async () => {
        const token = "invalid_token";

        const response = await supertest(app).get("/get-orders").set('Authorization', `Bearer ${token}`);

        expect(response.status).toEqual(401);
    })
    it("should respond with empty array when token is valid but there is no previous purchases", async () => {
        const token = await tokenFactory();
       
        const orders = await supertest(app).get("/get-orders").set('Authorization', `Bearer ${token}`);

        expect(orders.body).toEqual([]);
    })
    it("should respond with orders when token is valid and user has previous purchases", async () => {
        const token = await tokenFactory();

        await finishOrderFactory(token);

        const orders = await supertest(app).get("/get-orders").set('Authorization', `Bearer ${token}`);
    
        expect(orders.body[0]).toMatchObject({
            totalPrice: 10000
          });
    })
});

describe("POST /finish-orders", () => {
    it("should respond with status 401 when token is invalid", async () => {
        const token = "invalid_token";

        const response = await supertest(app).post("/finish-order").set('Authorization', `Bearer ${token}`);

        expect(response.status).toEqual(401);
    })
    it("should respond with status 201 when token and order body is valid", async () => {
        const token = await tokenFactory();

        const response = await finishOrderFactory(token);

        expect(response.status).toEqual(201);
    })
})

beforeEach( async () => {
    await connection.query(`DELETE FROM users`);
    await connection.query(`DELETE FROM authentication`);
    await connection.query(`DELETE FROM products`);
})

afterAll(() => {
    connection.end();
})