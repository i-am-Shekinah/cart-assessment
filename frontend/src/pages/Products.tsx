import {
  useEffect,
  useState,
} from 'react';

import { Link } from 'react-router-dom';

import { deleteProduct, getProducts } from '../api/products';
import { formatNGN } from '../utils/formatCurrency';
import ConfirmDialog from '../components/ConfirmDialog';
import Navbar from '../components/Navbar';
import ProductForm from '../components/ProductForm';
import { useCart } from '../context/CartContext';
import type { Product } from '../types/product';

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Product | null>(null);

  const { addToCart, cart } = useCart();

  const fetchProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const categories = [...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = category ? p.category === category : true;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Products</h1>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowForm(true)}
              className="bg-green-600 text-white text-sm px-3 py-1 rounded hover:bg-green-700"
            >
              + Add Product
            </button>

            <div className="text-sm bg-indigo-600 text-white px-3 py-1 rounded-full">
              Cart: {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </div>
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

              <p className="mt-2 font-bold">{formatNGN(product.price)}</p>

              <p className="text-xs text-gray-500 mt-1">{product.category}</p>

              <button
                onClick={() => addToCart(product)}
                className="mt-3 w-full bg-indigo-600 text-white py-1 rounded hover:bg-indigo-700"
              >
                Add to Cart
              </button>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => {
                    setEditingProduct(product);
                    setShowForm(true);
                  }}
                  className="flex-1 bg-yellow-500 text-white py-1 rounded text-sm hover:bg-yellow-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => setConfirmDelete(product)}
                  className="flex-1 bg-red-500 text-white py-1 rounded text-sm hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {showForm && (
          <ProductForm
            product={editingProduct}
            onClose={() => {
              setShowForm(false);
              setEditingProduct(null);
            }}
            onSaved={() => {
              setShowForm(false);
              setEditingProduct(null);
              fetchProducts();
            }}
          />
        )}

        {confirmDelete && (
          <ConfirmDialog
            title="Delete Product"
            message={`Are you sure you want to delete "${confirmDelete.name}"?`}
            confirmLabel="Delete"
            onConfirm={async () => {
              await deleteProduct(confirmDelete._id);
              setConfirmDelete(null);
              fetchProducts();
            }}
            onCancel={() => setConfirmDelete(null)}
          />
        )}
      </div>
    </>
  );
}
