import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import connection from './database.js';
import { getCategories, getSubCategories } from './routes/categories.js';
import { getBrands, getProductBrand } from './routes/brands.js';
import { getProducts, filterProducts } from './routes/products.js'
import { getSearch } from './routes/search.js';

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


export default app;