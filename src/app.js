import express from 'express';
import cors from 'cors';
import { categories, subCategories } from './controllers/categoriesController.js';
import { brands, productBrand } from './controllers/brandsController.js';
import { products, filterProducts } from './controllers/productsController.js'
import { search } from './controllers/searchController.js';
import { login } from './controllers/userController.js';
import { signUp, signUpAddress } from './controllers/signUpController.js';
import { getOrders, finishOrder } from './controllers/ordersController.js';


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

app.get('/products/:category', products);

app.get('/products/filter/:category', filterProducts);

app.get('/search/:search', search);

app.get('/get-orders', getOrders);

app.post('/finish-order', finishOrder);

export default app;