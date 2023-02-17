import express from 'express';
import cors from 'cors';
import { getCategories, getSubCategories } from './controllers/categoriesController.js';
import { getBrands, getProductBrand } from './controllers/brands.js';
import { getProducts, filterProducts } from './controllers/products.js'
import { getSearch } from './controllers/search.js';
import { login } from './controllers/userController.js';
import { signUp, signUpAddress } from './controllers/signUpController.js';
import { finishOrder } from './controllers/finishOrder.js';
import { getOrders } from './controllers/getOrders.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/login', login); 

app.post('/sign-up', signUp); 

app.post('/sign-up/address', signUpAddress); 

app.get('/categories', getCategories);

app.get('/brands', getBrands);

app.get('/brands/:brandId', getProductBrand);

app.get('/subcategories/:category', getSubCategories);

app.get('/products/:category', getProducts);

app.get('/filter/products/:category', filterProducts);

app.get('/search/:search', getSearch);

app.get('/get-orders', getOrders);

app.post('/finish-order', finishOrder);

export default app;