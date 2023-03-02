import * as userService from "../services/userService.js";

export async function login(req, res) {
    try {
        const { email, password } = req.body;

        if(!email || !password) return res.sendStatus(400);

        const session = await userService.authenticateUser(email, password);
        
        if(session === null) return res.sendStatus(401);

        res.send(session).status(200);
        
    } catch(e){
        console.log(e);  
        res.sendStatus(500);
    }   
}


