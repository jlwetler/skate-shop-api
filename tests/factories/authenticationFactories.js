import app from '../../src/app';
import { userBody,addressBody } from '../utils';
import supertest from 'supertest';

export async function signUpFactory() {
    const response = await supertest(app).post("/sign-up").send(userBody);
    
    return response;
}

export async function signAddressFactory(body) {
    await signUpFactory();
    
    const response = await supertest(app).post("/sign-up/address").send(body);
    
    return response;
}

export async function loginFactory() {
    await signUpFactory();
    await signAddressFactory(addressBody);

    const user = await supertest(app).post("/login").send({ email: userBody.email, password: userBody.password });

    return user;
}

export async function tokenFactory() {
    const user = await loginFactory();

    const { token } = user.body;
    
    return token;
}
