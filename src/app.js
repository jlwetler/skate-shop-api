import express from 'express';
import cors from 'cors';
import authRouter from './routes/authRouter.js';
import categoryRouter from './routes/categoryRouter.js';
import productRouter from './routes/productRouter.js';
import orderRouter from './routes/orderRouter.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use(authRouter);
app.use(categoryRouter);
app.use(productRouter);
app.use(orderRouter)

export default app;