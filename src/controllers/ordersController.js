import { validate } from "../services/userService.js";
import { purchases } from "../services/purchasesService.js";
import { placeOrder } from "../repositories/orderRepository.js";
import { placeProducts } from "../services/finishOrderService.js";

export async function getOrders(req, res) {
    try {
        const authorization = req.header("Authorization");
        
        const userId = await validate(authorization);

        if(userId === null) return res.sendStatus(401);
        
        const result = await purchases(userId);

        if (result === null) return res.send([]);

        res.send(result);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
}

export async function finishOrder(req, res) {
    try {
        const authorization = req.header("Authorization");
        const { cartInfo, orderPrice} = req.body;
        
        const userId = await validate(authorization);

        if(userId === null) return res.sendStatus(401);
   
        await placeOrder(userId, orderPrice)
        
        await placeProducts(userId, cartInfo)

        res.sendStatus(201);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
}