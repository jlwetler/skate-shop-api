import { getPurchaseId } from "../repositories/purchaseRepository.js";
import { insertProducts, updateStock } from "../repositories/orderRepository.js";

export async function placeProducts(userId, cartInfo) {
    const purchaseIds = await getPurchaseId(userId);
    
    const purchaseId = purchaseIds[purchaseIds.length - 1].id;
       
    cartInfo.forEach(async ({id, quantity, price}) => {
        await insertProducts(id, purchaseId, quantity, price)
    })

    cartInfo.forEach(async ({id, quantity}) => {
        await updateStock(quantity, id)
    })
}