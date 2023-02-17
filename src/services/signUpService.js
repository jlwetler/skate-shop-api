import { emailCheck } from '../repositories/emailCheckRepository.js';
import { insertUserData } from '../repositories/insertUserRepository.js';
import bcrypt from 'bcrypt';

export async function authenticateSignUp(userObject) {
    const { name, lastName, email, password } = userObject;

    const hashPassword = bcrypt.hashSync(password, 12);

    const check = await emailCheck(email);

    if (check === null) return null;
    
    await insertUserData (name, lastName, email, hashPassword)
}
