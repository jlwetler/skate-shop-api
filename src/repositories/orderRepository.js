import connection from "../database.js";

export async function placeOrder(userId, orderPrice) {
    await connection.query(`
        INSERT INTO purchases ("userId", date, "totalPrice") 
        VALUES ($1, now(), $2)
    `, [userId, orderPrice])
}

export async function insertProducts(id, purchaseId, quantity, price) {
    await connection.query(`
        INSERT INTO product_purchase ("productId", "purchaseId", amount, "paidPrice")
        VALUES ($1, $2, $3, $4)
    `, [id, purchaseId, quantity, price])
}

export async function updateStock(quantity, id) {
    await connection.query(`
        UPDATE products SET stock = stock - $1
        WHERE id = $2
    `, [quantity, id])

}