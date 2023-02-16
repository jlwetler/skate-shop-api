import connection from "../database.js";

export async function finishOrder(req, res) {
    try {
        
        const authorization = req.header("Authorization");
        const token = authorization?.replace("Bearer ", "");
        
        const { cartInfo, orderPrice} = req.body;
    
        const validateToken = await connection.query(`
            SELECT users.id FROM users
            JOIN authentication ON authentication."userId" = users.id
            WHERE authentication.token = $1
        `, [token]);
            
        if(validateToken.rows.length === 0) return res.sendStatus(401);

        const userId = validateToken.rows[0].id;
        
        await connection.query(`
            INSERT INTO purchases ("userId", date, "totalPrice") 
            VALUES ($1, now(), $2)
        `, [userId, orderPrice])
        
        const purchase = await connection.query(`
            SELECT id FROM purchases
            WHERE "userId" = $1
        `, [userId])

        const lastItem = purchase.rows.length - 1;

        const purchaseId = purchase.rows[lastItem].id;
       
        cartInfo.forEach(async ({id, quantity, price}) => {
            await connection.query(`
                INSERT INTO product_purchase ("productId", "purchaseId", amount, "paidPrice")
                VALUES ($1, $2, $3, $4)
            `, [id, purchaseId, quantity, price])
        })

        cartInfo.forEach(async ({id, quantity}) => {
            await connection.query(`
                UPDATE products SET stock = stock - $1
                WHERE id = $2
            `, [quantity, id])
        })

        res.sendStatus(201);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
}