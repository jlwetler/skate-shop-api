import { validate } from "../services/userService.js";
import { purchases } from "../services/purchasesService.js";

export async function getOrders(req, res) {
    try {
        const authorization = req.header("Authorization");
        const token = authorization?.replace("Bearer ", "");
        const userId = await validate(token);

        if(userId === null) return res.sendStatus(401);
        const result = await purchases(userId);

        if (result === null) return res.send([]);

        res.send(result);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
}