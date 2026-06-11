import {
  useEffect,
  useState,
} from 'react';

import { useParams } from 'react-router-dom';

import { getProductById } from '../api/products';
import { useCart } from '../context/CartContext';
import type { Product } from '../types/product';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) return;

        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Product not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-2">
          {product.name}
        </h1>

        <p className="text-gray-600 mb-4">
          {product.description}
        </p>

        <div className="mb-2 text-sm text-gray-500">
          Category: {product.category}
        </div>

        <div className="text-xl font-bold mb-4">
          ${product.price}
        </div>

        <button
          onClick={() => addToCart(product)}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}