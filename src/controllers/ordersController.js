import * as userService from "../services/userService.js";
import * as purchasesService from "../services/purchasesService.js";
import * as finishOrderService from "../services/finishOrderService.js";

export async function getOrders(req, res) {
    try {
        const authorization = req.header("Authorization");
        
        const userId = await userService.validate(authorization);
        
        if(userId === null) return res.sendStatus(401);
        
        const result = await purchasesService.findPurchases(userId);
        
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
        
        const userId = await userService.validate(authorization);

        if(userId === null) return res.sendStatus(401);
        
        await finishOrderService.placeProducts(userId, cartInfo, orderPrice)

        res.sendStatus(201);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
}