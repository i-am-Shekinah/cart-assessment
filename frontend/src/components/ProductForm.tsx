import {
  type FormEvent,
  useEffect,
  useState,
} from 'react';

import {
  createProduct,
  updateProduct,
} from '../api/products';
import type { Product } from '../types/product';

interface ProductFormProps {
  product?: Product | null;
  onClose: () => void;
  onSaved: () => void;
}

export default function ProductForm({ product, onClose, onSaved }: ProductFormProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const isEdit = !!product;

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(String(product.price));
      setCategory(product.category);
      setDescription(product.description || "");
      setImageUrl(product.imageUrl || "");
    }
  }, [product]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !price || !category.trim()) {
      setError("Name, price, and category are required.");
      return;
    }

    const priceNum = Number(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      setError("Price must be a positive number.");
      return;
    }

    const payload = {
      name: name.trim(),
      price: priceNum,
      category: category.trim(),
      ...(description.trim() && { description: description.trim() }),
      ...(imageUrl.trim() && { imageUrl: imageUrl.trim() }),
    };

    setSubmitting(true);

    try {
      if (isEdit) {
        await updateProduct(product._id, payload);
      } else {
        await createProduct(payload);
      }
      onSaved();
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || "Something went wrong";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded shadow-lg w-full max-w-md p-6 mx-4">
        <h2 className="text-lg font-bold mb-4">
          {isEdit ? "Edit Product" : "Add Product"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            placeholder="Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border rounded w-full"
            required
          />

          <input
            type="number"
            step="any"
            placeholder="Price *"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="p-2 border rounded w-full"
            required
          />

          <input
            placeholder="Category *"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 border rounded w-full"
            required
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 border rounded w-full"
            rows={3}
          />

          <input
            type="url"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="p-2 border rounded w-full"
          />

          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}

          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
            >
              {submitting ? "Saving..." : isEdit ? "Update" : "Create"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
