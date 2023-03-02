import * as purchaseRepository from "../repositories/purchaseRepository.js";
import * as orderRepository from "../repositories/orderRepository.js";

export async function placeProducts(userId, cartInfo,orderPrice) {
    await orderRepository.placeOrder(userId, orderPrice);

    const purchaseIds = await purchaseRepository.getPurchaseId(userId);
    
    const purchaseId = purchaseIds[purchaseIds.length - 1].id;
       
    cartInfo.forEach(async ({id, quantity, price}) => {
        await orderRepository.insertProducts(id, purchaseId, quantity, price);
    })

    cartInfo.forEach(async ({id, quantity}) => {
        await orderRepository.updateStock(quantity, id);
    })
}