import '../src/setup.js';
import app from '../src/app.js';
import supertest from 'supertest';
import connection from '../src/database.js';

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

    it("should respond with status 409 when there is another user with given email", async () => {
        const body = {
            name: 'Fulano',
            lastName: 'DiTal',
            email: 'fulano@email.com',
            password: '123456'
        }
        await supertest(app).post("/sign-up").send(body);
        const response = await supertest(app).post("/sign-up").send(body);
        
        expect(response.status).toEqual(409);
    })
});

describe("POST /sign-up/address", () => {
    it("should respond with status 201 when address has been registred", async () => {
        const body = {
            name: 'Fulano',
            lastName: 'DiTal',
            email: 'fulano@email.com',
            password: '123456'
        }
        
        await supertest(app).post("/sign-up").send(body);
        
        const addressBody = {
            street: 'Avenida street',
            cep: '12345678',
            district: 'district',
            city: 'city',
            phone: '12345678910',
            email: 'fulano@email.com'
        }

        const response = await supertest(app).post("/sign-up/address").send(addressBody);

        expect(response.status).toEqual(201);
    });

    it("should respond with status 409 when there is no user found", async () => {
        const body = {
            name: 'Fulano',
            lastName: 'DiTal',
            email: 'fulano@email.com',
            password: '123456'
        }
        
        await supertest(app).post("/sign-up").send(body);

        const addressBody = {
            street: 'Avenida street',
            cep: '12345678',
            district: 'district',
            city: 'city',
            phone: '12345678910',
            email: 'wrong@email.com'
        }
        const response = await supertest(app).post("/sign-up/address").send(addressBody);
        
        expect(response.status).toEqual(409);
    })
});

describe("POST /login", () => {
    it("should respond with status 200 when user and password are valid", async () => {
        const body = {
            name: 'Fulano',
            lastName: 'DiTal',
            email: 'fulano@email.com',
            password: '123456'
        }
        await supertest(app).post("/sign-up").send(body);

        const response = await supertest(app).post("/login").send({ email: body.email, password: body.password });

        expect(response.status).toEqual(200);
    })

    it("should respond with status 401 when password is not valid", async () => {
        const body = {
            name: 'Fulano',
            lastName: 'DiTal',
            email: 'fulano@email.com',
            password: '123456'
        }
        await supertest(app).post("/sign-up").send(body);

        const response = await supertest(app).post("/login").send({ email: body.email, password: "incorrectPassword" });

        expect(response.status).toEqual(401);
    })
});


beforeEach(async () => {
    await connection.query(`DELETE FROM users`);
})

afterAll(() => {
    connection.end();
})