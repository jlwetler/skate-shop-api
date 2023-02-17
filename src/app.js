import express from 'express';
import cors from 'cors';
import { categories, subCategories } from './controllers/categoriesController.js';
import { brands, productBrand } from './controllers/brandsController.js';
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

app.get('/categories', categories);

app.get('/subcategories/:category', subCategories);

app.get('/brands', brands);

app.get('/brands/:brandId', productBrand);

app.get('/products/:category', getProducts);

app.get('/filter/products/:category', filterProducts);

app.get('/search/:search', getSearch);

app.get('/get-orders', getOrders);

app.post('/finish-order', finishOrder);

export default app;