import { emailCheck } from "../repositories/emailCheckRepository.js";
import { insertAddressData } from "../repositories/insertAddressRepository.js";

export async function authenticateAddress(addressObject) {
    const { street, cep, district, city, phone, email } = addressObject;
    const addressCheck = true;
    
    const check = await emailCheck(email, addressCheck);
    
    if (check === null) return null;

    const userId = check.rows[0].id;

    await insertAddressData(street, cep, district, city, userId, phone);
}