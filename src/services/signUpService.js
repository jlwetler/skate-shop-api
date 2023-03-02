import * as emailRepository from '../repositories/emailRepository.js';
import * as userRepository from '../repositories/userRepository.js';
import bcrypt from 'bcrypt';

export async function authenticateSignUp(userObject) {
    const { name, lastName, email, password } = userObject;

    const hashPassword = bcrypt.hashSync(password, 12);

    const check = await emailRepository.emailCheck(email);

    if (check === null) return null;
    
    await userRepository.insertUserData(name, lastName, email, hashPassword);
}
