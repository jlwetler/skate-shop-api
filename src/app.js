import express from 'express';
import cors from 'cors';
import { getCategories, getSubCategories } from './routes/categories.js';
import { getBrands, getProductBrand } from './routes/brands.js';
import { getProducts, filterProducts } from './routes/products.js'
import { getSearch } from './routes/search.js';
import { getLogin } from './routes/login.js';
import { signUp, signUpAddress } from './routes/signUp.js';
import { finishOrder } from './routes/finishOrder.js';
import { getOrders } from './routes/getOrders.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/categories', async (req,res) => getCategories(req, res));

app.get('/brands', async (req,res) => getBrands(req, res));

app.get('/brands/:brandId',  async (req,res) => getProductBrand(req, res));

app.get('/subcategories/:category', async (req,res) => getSubCategories(req, res));

app.get('/products/:category', async (req,res) => getProducts(req, res));

app.get('/filter/products/:category', async (req,res) => filterProducts(req, res));

app.get('/search/:search', async (req,res) => getSearch(req, res));

app.get('/get-orders', async (req,res) => getOrders(req, res));

app.post('/login', async (req,res) => getLogin(req, res));

app.post('/sign-up', async (req,res) => signUp(req, res));

app.post('/sign-up/address', async (req,res) => signUpAddress(req, res));

app.post('/finish-order', async (req,res) => finishOrder(req, res));

export default app;