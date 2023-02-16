import connection from "../database.js";

export async function getProducts(req, res) {
    try {
        const { category } = req.params;
        
        const products = await connection.query(`
            SELECT products.*, brands.image AS "brandImage" FROM products 
            JOIN categories
            ON  products."categoryId" = categories.id
            JOIN brands
            ON products."brandId" = brands.id
            WHERE categories.name = $1 
        `, [category])
        res.send(products.rows).status(200);
    } catch {
        res.sendStatus(500);
    }
}

export async function filterProducts(req, res) {
    try {
        const { category } = req.params;
        const { subCategory, query, price, order} = req.query;

        const brands = JSON.parse(query);
        let brandsQuery = '';
        
        brands.forEach((b , i) => {
            brandsQuery += `brands.name = '${b}' OR `
            if(i === (brands.length - 1) ) {
                brandsQuery = brandsQuery.slice(0, -3);
            }
        });
       
        let subCategoryQuery = '';
        subCategory ? subCategoryQuery = `AND "subCategories".name = $3 ` : '';

        if (brandsQuery.length !== 0) subCategoryQuery += 'AND';

        const queryArray = subCategory ? [category, price, subCategory] : [category, price]
        
        let orderBy =''
        if (order === 'Menorpreço') {
            orderBy = 'ORDER BY price ASC'
        } else if (order === 'Maiorpreço') {
            orderBy = 'ORDER BY price DESC'
        } else if (order === 'Nome(A-Z)') {
            orderBy = 'ORDER BY name ASC'
        }

        const products = await connection.query(`
            SELECT products.* FROM products 
            JOIN categories
            ON products."categoryId" = categories.id
            ${subCategory ? 'JOIN "subCategories" ON products."subCategoryId" = "subCategories".id' : ''}
            JOIN brands
            ON products."brandId" = brands.id
            WHERE categories.name = $1 AND 
            products.price < $2
            ${subCategoryQuery} 
            ${brandsQuery}
            ${orderBy}
        `, queryArray)

        res.send(products.rows).status(200);
    } catch {
        res.sendStatus(500);
    }
}


