import {
  useEffect,
  useState,
} from 'react';

import { Link } from 'react-router-dom';

import { getProducts } from '../api/products';
import { useCart } from '../context/CartContext';
import type { Product } from '../types/product';

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const { addToCart, cart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts();
      setProducts(data);
    };

    fetchData();
  }, []);

  const categories = [...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = category ? p.category === category : true;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>

        <div className="text-sm bg-indigo-600 text-white px-3 py-1 rounded-full">
          Cart: {cart.reduce((sum, item) => sum + item.quantity, 0)}
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        <input
          placeholder="Search products..."
          className="p-2 border rounded w-1/2"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="p-2 border rounded"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div key={product._id} className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold text-lg">
              <Link
                to={`/product/${product._id}`}
                className="font-semibold text-lg hover:text-indigo-600"
              >
                {product.name}
              </Link>
            </h2>

            <p className="text-gray-600 text-sm mt-1">{product.description}</p>

            <p className="mt-2 font-bold">${product.price}</p>

            <p className="text-xs text-gray-500 mt-1">{product.category}</p>

            <button
              onClick={() => addToCart(product)}
              className="mt-3 w-full bg-indigo-600 text-white py-1 rounded hover:bg-indigo-700"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
