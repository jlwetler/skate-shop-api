import * as userService from "../services/userService.js";

export async function authValidation(req, res, next) {
    const authorization = req.header("Authorization");  
    
    const userId = await userService.validate(authorization);
        
    if(userId === null) return res.sendStatus(401);

    res.locals.userId = userId;

    next();
}