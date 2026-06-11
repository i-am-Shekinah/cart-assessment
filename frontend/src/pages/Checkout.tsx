import { useCart } from '../context/CartContext';
import { formatNGN } from '../utils/formatCurrency';

export default function Checkout() {
  const { cart, removeFromCart, getTotal, clearCart } = useCart();

  const total = getTotal();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {/* Cart Items */}
          {cart.map((item) => (
            <div
              key={item._id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold">{item.name}</h2>

                <p className="text-sm text-gray-600">
                  {formatNGN(item.price)} × {item.quantity}
                </p>
              </div>

              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Summary */}
          <div className="bg-white p-4 rounded shadow mt-6">
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>{formatNGN(total)}</span>
            </div>

            <button
              onClick={() => {
                alert("Order placed successfully!");
                clearCart();
              }}
              disabled={cart.length === 0}
              className={`mt-4 w-full py-2 rounded text-white transition
                ${
                  cart.length === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
            >
              {cart.length === 0 ? "Cart Empty" : "Place Order"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}