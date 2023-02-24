import express from 'express';
import cors from 'cors';
import * as categoriesController from './controllers/categoriesController.js';
import * as brandsController from './controllers/brandsController.js';
import * as productsController from './controllers/productsController.js'
import * as searchController from './controllers/searchController.js';
import * as userController from './controllers/userController.js';
import * as signUpController from './controllers/signUpController.js';
import * as ordersController from './controllers/ordersController.js';


const app = express();
app.use(cors());
app.use(express.json());

app.post('/login', userController.login); 

app.post('/sign-up', signUpController.signUp); 

app.post('/sign-up/address', signUpController.signUpAddress); 

app.get('/categories', categoriesController.categories);

app.get('/subcategories/:category', categoriesController.subCategories);

app.get('/brands', brandsController.brands);

app.get('/brands/:brandId', brandsController.productBrand);

app.get('/products/:category', productsController.products);

app.get('/products/filter/:category', productsController.filterProducts);

app.get('/search/:search', searchController.search);

app.get('/get-orders', ordersController.getOrders);

app.post('/finish-order', ordersController.finishOrder);

export default app;