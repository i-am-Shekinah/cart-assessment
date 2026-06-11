export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
}

export interface CreateProductInput {
  name: string;
  description?: string;
  price: number;
  category: string;
  imageUrl?: string;
}

export type UpdateProductInput = Partial<CreateProductInput>;