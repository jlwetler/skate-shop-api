import * as emailRepository from "../repositories/emailRepository.js";
import * as addressRepository from "../repositories/addressRepository.js";

export async function authenticateAddress(addressObject) {
    const { street, cep, district, city, phone, email } = addressObject;
    const addressCheck = true;
    
    const check = await emailRepository.emailCheck(email, addressCheck);

    if (check === null) return null;

    const userId = check.id;

    await addressRepository.insertAddressData(street, cep, district, city, userId, phone);
}