import '../src/setup.js';
import app from '../src/app.js';
import supertest from 'supertest';
import connection from '../src/database.js';
import { tokenFactory } from './factories/authenticationFactories.js';

describe("GET /get-orders", () => {
    it("should respond with status 401 when token is invalid", async () => {
        const token = "invalid_token";

        const response = await supertest(app).get("/get-orders").set('Authorization', `Bearer ${token}`);

        expect(response.status).toEqual(401);
    })
    it("should respond with empty array when token is valid but there is no previous orders", async () => {
        const token = await tokenFactory();
     
        const orders = await supertest(app).get("/get-orders").set('Authorization', `Bearer ${token}`);

        expect(orders.body).toEqual([]);
    })
});

beforeEach( async () => {
    await connection.query(`DELETE FROM users`);
})

afterAll(() => {
    connection.end();
})