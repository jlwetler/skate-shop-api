import connection from "../database.js";

export async function getOrders(req, res) {
    try {
        const authorization = req.header("Authorization");
        const token = authorization?.replace("Bearer ", "");
    
        const validateToken = await connection.query(`
            SELECT users.id FROM users
            JOIN authentication ON authentication."userId" = users.id
            WHERE authentication.token = $1
        `, [token]);
            
        if(validateToken.rows.length === 0) return res.sendStatus(401);

        const userId = validateToken.rows[0].id;

        const purchase = await connection.query(`
            SELECT id, date FROM purchases
            WHERE "userId" = $1
        `, [userId])
        
        if (purchase.rows.length === 0) res.send([]);
        
        /*const promise = purchase.rows.map(({ id }) => {
            return connection.query(`
            SELECT products.name, product_purchase.amount, product_purchase."paidPrice", purchases.date
            FROM product_purchase JOIN purchases ON purchases.id = product_purchase."purchaseId"
            JOIN products ON products.id = product_purchase."productId"
            WHERE purchases.id = $1
            `, [id])
        })
        let orders=[];
        Promise.all(promise)
        .then(result => {
            purchase.map(({ id, date }) => {
                orders.push({
                    id, 
                    date, 
                    products: result.map(r => r.rows)
                })
            })
        })
        res.send(orders)*/

        const promise = purchase.rows.map(({ id }) => {
            return  connection.query(`
            SELECT purchases.id, purchases.date,
            jsonb_agg(jsonb_build_object(
            'name', products.name,
            'amount', product_purchase.amount,
            'paidPrice', product_purchase."paidPrice"
            )) AS products
            FROM purchases
            JOIN product_purchase ON product_purchase."purchaseId" = purchases.id
            JOIN products ON products.id = product_purchase."productId"
            WHERE purchases.id = $1
            GROUP BY purchases.id, purchases.date
            `, [id]);
        })

        const result = await Promise.all(promise);
        
        res.send(result.flatMap(r => r.rows));

    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
}