import { Product } from './products.model.js';
import type {
  CreateProductDto,
  UpdateProductDto,
} from './products.validation.js';

export class ProductsService {

    async createProduct(data: CreateProductDto) {

        return await Product.create(data);
    }

    async updateProduct(id: string, data: UpdateProductDto) {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedProduct) {
            throw new Error('Product not found');
        }

        return updatedProduct;
    }

    async getAllProducts() {
        return await Product.find().sort({ createdAt: -1 });
    }

    async getProductById(id: string) {
        const product = await Product.findById(id);

        if (!product) {
            throw new Error('Product not found');
        }

        return product;
    }

    async deleteProduct(id: string) {
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            throw new Error('Product not found');
        }

        return deletedProduct;
    }
}