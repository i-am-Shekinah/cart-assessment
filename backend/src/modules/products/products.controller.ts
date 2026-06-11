import type {
  Request,
  Response,
} from 'express';

import { ProductsService } from './products.service.js';

const productsService = new ProductsService();

export class ProductsController {

    async createProduct(req: Request, res: Response) {
        try {
            const product = await productsService.createProduct(req.body);

            res.status(201).json({
                success: true,
                data: product,
            });
        } catch (error) {
            res.status(500).json({
                message: (error as Error).message
            });
        }
    }

    async updateProduct(req: Request<{ id: string }>, res: Response) {
        try {
            const product = await productsService.updateProduct(req.params.id, req.body);

            res.status(200).json({
                success: true,
                data: product,
            });
        } catch (error) {
            res.status(500).json({
                message: (error as Error).message
            });
        }
    }

    async getAllProducts(_req: Request, res: Response) {
        try {
            const products = await productsService.getAllProducts();

            res.status(200).json({
                success: true,
                data: products,
            })
        } catch (error) {
            res.status(500).json({
                message: (error as Error).message
            })
        }
    }

    async getProductById(req: Request<{ id: string }>, res: Response) {
        try {
            const product = await productsService.getProductById(req.params.id);

            res.status(200).json({
                success: true,
                data: product,
            })
        } catch (error) {
            res.status(500).json({
                message: (error as Error).message
            })
        }
    }

    async deleteProduct(req: Request<{ id: string }>, res: Response) {
        try {
            await productsService.deleteProduct(req.params.id);

            res.status(204).send();
        } catch (error) {
            res.status(500).json({
                message: (error as Error).message
            })
        }
    }
}