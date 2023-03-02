import * as signUpService from "../services/signUpService.js";
import * as addressService from "../services/addressService.js";
import { userSchema } from "../schemas/userSchema.js";
import { addressSchema } from "../schemas/addressSchema.js";

export async function signUp(req, res) {
    try {
        const userObject = await userSchema(req.body);
        
        const authenticate = await signUpService.authenticateSignUp(userObject)
        
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
        
        const authentication = await addressService.authenticateAddress(addressObject)
        
        if(authentication === null) return res.sendStatus(409);

        res.sendStatus(201);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
}

