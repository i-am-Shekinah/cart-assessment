import cors from 'cors';
import express from 'express';

import routes from './routes/index.js';

const app = express();

app.use(cors({
    origin: [
        'http://localhost:5173', 
        'https://cart-assessment-sepia.vercel.app'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
}));

app.use(express.json());

app.use((_req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
});

app.use('/api', routes);


export default app;
