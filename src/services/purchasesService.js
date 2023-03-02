import * as purchaseRepository from "../repositories/purchaseRepository.js";

export async function findPurchases(userId) {

    const purchaseId = await purchaseRepository.getPurchaseId(userId);

    if (purchaseId === null) return null;

    const promise = purchaseId.map(async ({ id }) => {
       return await purchaseRepository.getPurchases(id);
    });
    
    const result = await Promise.all(promise);

    return result.flatMap((r) => r.rows);
}