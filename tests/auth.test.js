import '../src/setup.js';
import app from '../src/app.js';
import supertest from 'supertest';
import { userBody, addressBody, cleanDatabase, endConnection } from './utils.js';
import { signUpFactory, signAddressFactory, loginFactory } from './factories/authenticationFactories.js'

beforeEach(cleanDatabase);

afterAll(async () => {
    await cleanDatabase();
    await endConnection();
});

describe("POST /sign-up", () => {
    it("should respond with status 201 when there is no user with given email", async () => {
        const response = await signUpFactory();
        
        expect(response.status).toEqual(201);
    });

    it("should respond with status 409 when there is another user with given email", async () => {
        await signUpFactory();
        
        const response = await signUpFactory();
        
        expect(response.status).toEqual(409);
    })
});

describe("POST /sign-up/address", () => {
    it("should respond with status 201 when address has been registred", async () => {
        const response = await signAddressFactory(addressBody);
        
        expect(response.status).toEqual(201);
    });

    it("should respond with status 409 when there is no email found", async () => {
        const body = {...addressBody, email: 'wrong@email.com'};

        const response = await signAddressFactory(body)
        
        expect(response.status).toEqual(409);
    })
});

describe("POST /login", () => {
    it("should respond with status 400 when email or password data is empty", async () => {
        const response = await supertest(app).post("/login").send({ email: "", password: "password" });

        expect(response.status).toEqual(400);
    })
    it("should respond with status 401 when password is not valid", async () => {
        await signUpFactory();
        
        const body  = userBody;

        const response = await supertest(app).post("/login").send({ email: body.email, password: "incorrectPassword" });

        expect(response.status).toEqual(401);
    })
    it("should respond with status 200 when user and password are valid", async () => {
        const response = await loginFactory();
        
        expect(response.status).toEqual(200);
    })
});
