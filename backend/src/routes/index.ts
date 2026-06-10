import { Router } from 'express';

import authRoutes from '../modules/auth/auth.routes.js';
import productsRoutes from '../modules/products/products.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/products', productsRoutes);

export default router;