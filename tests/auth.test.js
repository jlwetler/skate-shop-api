import '../src/setup.js';
import app from '../src/app.js';
import supertest from 'supertest';

describe("POST /sign-up", () => {
    it("should respond with status 201 when there is no user with given email", async () => {
        const body = {
            name: 'Fulano',
            lastName: 'DiTal',
            email: 'fulano@email.com',
            password: '123456'
        }
        
        const response = await supertest(app).post("/sign-up").send(body);
        
        expect(response.status).toEqual(201);
    });
});