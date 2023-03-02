import * as sessionRepository from "../repositories/sessionRepository.js";
import * as userRepository from "../repositories/userRepository.js";
import * as tokenRepository from "../repositories/tokenRepository.js";
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';

export async function authenticateUser(email, password) {
    const user = await userRepository.findUser(email);
    
    if(user && bcrypt.compareSync(password, user.password)) {
        const id = user.id;
        const token = uuid();
        
        const session = await sessionRepository.createSession(id, token);
        
        return session;
    } else {
        return null;
    }
}

export async function validate(authorization) {
    const token = authorization?.replace("Bearer ", "");
    const userId = await tokenRepository.validateToken(token);

    if(userId === null) return null;

    return userId;
}