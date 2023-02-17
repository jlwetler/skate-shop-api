import connection from "../database.js";

export async function getPurchaseId(userId) {
    const purchaseId = await connection.query(`
        SELECT id FROM purchases
        WHERE "userId" = $1
    `,[userId]);

    if (purchaseId.rows.length === 0) return null;
     
    return purchaseId.rows;
}

export async function getPurchases(id) {

    const promise = await connection.query(`
        SELECT purchases.id, purchases.date, purchases."totalPrice",
        jsonb_agg(jsonb_build_object(
        'name', products.name,
        'amount', product_purchase.amount,
        'paidPrice', product_purchase."paidPrice"
        )) AS products
        FROM purchases
        JOIN product_purchase ON product_purchase."purchaseId" = purchases.id
        JOIN products ON products.id = product_purchase."productId"
        WHERE purchases.id = $1
        GROUP BY purchases.id, purchases.date, purchases."totalPrice"
    `,[id]);

    return promise;
}