import app from '../src/app.js';
import supertest from 'supertest';

export async function signUpFactory() {
    const body = {
            name: 'Fulano',
            lastName: 'DiTal',
            email: 'fulano@email.com',
            password: '123456'
        }
        
    const response = await supertest(app).post("/sign-up").send(body);
    
    return { response, body };
}

export async function loginFactory() {
    const { body } = await signUpFactory();
    
    const user = await supertest(app).post("/login").send({ email: body.email, password: body.password });
    
    return user;
}

export async function orderFactory() {

}