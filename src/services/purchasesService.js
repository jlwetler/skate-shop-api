import { getPurchaseId, getPurchases } from "../repositories/purchaseRepository.js";

export async function purchases(userId) {

    const purchaseId = await getPurchaseId(userId)

    if (purchaseId === null) return null;

    const promise = purchaseId.map(async ({ id }) => {
       return await getPurchases(id)
    });
    
    const result = await Promise.all(promise);

    return result.flatMap((r) => r.rows);
}