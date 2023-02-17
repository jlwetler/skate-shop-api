import { authenticateSignUp } from "../services/signUpService.js";
import { authenticateAddress } from "../services/addressService.js";
import { userSchema } from "../schemas/userSchema.js";
import { addressSchema } from "../schemas/addressSchema.js";

export async function signUp(req, res) {
    try {
        const userObject = await userSchema(req.body);
        
        const authenticate = await authenticateSignUp (userObject)

        if (authenticate === null) return res.sendStatus(409);

        res.sendStatus(201);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
}

export async function signUpAddress(req, res) {
    try {
        const addressObject = await addressSchema(req.body);
        
        await authenticateAddress(addressObject)

        if(authenticateAddress === null) res.sendStatus(409);

        res.sendStatus(201);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
}

