import { getFilteredProducts } from "../repositories/productsRepository.js";

export async function searchProducts(params, reqQuery) {
    const { category } = params;
    const { subCategory, query, price, order} = reqQuery;

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

    const products = await getFilteredProducts(subCategory, subCategoryQuery, brandsQuery, orderBy, queryArray)
    
    return products;
}