import { z } from 'zod';

import { toTitleCase } from '../../utils/format-name.js';

export const createProductSchema = z.object({
    name: z.string().trim().min(1, 'Product name is required'),
    description: z.string().trim().optional(),
    price: z.number().positive('Price must be a positive number'),
    category: z.string().trim().min(1, 'Category is required').transform(toTitleCase),
    imageUrl: z.string().trim().url('Invalid URL format').optional(),
})

export type CreateProductDto = z.infer<typeof createProductSchema>;

export const updateProductSchema = z.object({
    name: z.string().trim().min(1, 'Product name is required').optional(),
    description: z.string().trim().optional(),
    price: z.number().positive('Price must be a positive number').optional(),
    category: z.string().trim().min(1, 'Category is required').optional().transform((val) => (val ? toTitleCase(val) : undefined)),
    imageUrl: z.string().trim().url('Invalid URL format').optional(),
})

export type UpdateProductDto = z.infer<typeof updateProductSchema>;