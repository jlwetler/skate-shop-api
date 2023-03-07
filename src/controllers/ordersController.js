import * as purchasesService from "../services/purchasesService.js";
import * as finishOrderService from "../services/finishOrderService.js";

export async function getOrders(req, res) {
    try {
        const userId = res.locals.userId;
        
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
        const { cartInfo, orderPrice} = req.body;

        const userId = res.locals.userId;
        
        await finishOrderService.placeProducts(userId, cartInfo, orderPrice)

        res.sendStatus(201);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
}