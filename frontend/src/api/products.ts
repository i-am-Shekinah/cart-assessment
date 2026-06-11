import type { Product } from '../types/product';
import API from './axios';

export const getProducts = async (): Promise<Product[]> => {
  const res = await API.get("/products");
  return res.data.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const res = await API.get(`/products/${id}`);
  return res.data.data;
};