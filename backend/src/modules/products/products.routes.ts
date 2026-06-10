import { Router } from 'express';

import { protect } from '../../middleware/auth.middleware.js';
import { validateRequest } from '../../middleware/validate.middleware.js';
import { ProductsController } from './products.controller.js';
import {
  createProductSchema,
  updateProductSchema,
} from './products.validation.js';

const productsRouter = Router();
const productsController = new ProductsController();

// Protected endpoints
productsRouter.post('/', protect, validateRequest(createProductSchema), productsController.createProduct);

productsRouter.put('/:id', protect, validateRequest(updateProductSchema), productsController.updateProduct);

productsRouter.delete('/:id', protect, productsController.deleteProduct);



// Public endpoints
productsRouter.get('/', productsController.getAllProducts);
productsRouter.get('/:id', productsController.getProductById);

export default productsRouter;