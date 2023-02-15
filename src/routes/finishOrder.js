import connection from "../database.js";

export async function finishOrder(req, res) {
    try {
        
        const authorization = req.header("Authorization");
        const token = authorization?.replace("Bearer ", "");
        
        const { cartInfo, orderPrice} = req.body;
        console.log(cartInfo);
        const validateToken = await connection.query(`
            SELECT users.id FROM users
            JOIN authentication ON authentication."userId" = users.id
            WHERE authentication.token = $1
        `, [token]);
            
        if(validateToken.rows.length === 0) return res.sendStatus(401);

        const userId = validateToken.rows[0].id;
        console.log(userId);
        await connection.query(`
            INSERT INTO purchases ("userId", date) 
            VALUES ($1, now())
        `, [userId])
        
        const purchase = await connection.query(`
            SELECT id FROM purchases
            WHERE id = $1
        `, [userId])

        const purchaseId = purchase.rows[0].id;
        console.log(purchaseId);
        cartInfo.forEach(async ({id, quantity, price}) => {
            await connection.query(`
                INSERT INTO product_purchase ("productId", "purchaseId", amount, "paidPrice")
                VALUES ($1, $2, $3, $4)
            `, [id, purchaseId, quantity, price])
        })

        res.sendStatus(201);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
}