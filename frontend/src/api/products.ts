import type { CreateProductInput, Product, UpdateProductInput } from '../types/product';
import API from './axios';

export const getProducts = async (): Promise<Product[]> => {
  const res = await API.get("/products");
  return res.data.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const res = await API.get(`/products/${id}`);
  return res.data.data;
};

export const createProduct = async (data: CreateProductInput): Promise<Product> => {
  const res = await API.post("/products", data);
  return res.data.data;
};

export const updateProduct = async (id: string, data: UpdateProductInput): Promise<Product> => {
  const res = await API.put(`/products/${id}`, data);
  return res.data.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await API.delete(`/products/${id}`);
};