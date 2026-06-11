import {
  NavLink,
  useNavigate,
} from 'react-router-dom';

import { useCart } from '../context/CartContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { cart } = useCart();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const navClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-indigo-600 font-semibold"
      : "text-gray-700 hover:text-indigo-600";

  return (
    <nav className="bg-white shadow px-6 py-3 flex justify-between items-center">
      {/* Brand */}
      <NavLink
        to="/products"
        className="text-xl font-bold text-indigo-600"
      >
        Shoply
      </NavLink>

      {/* Links */}
      <div className="flex items-center gap-6">
        <NavLink to="/products" className={navClass}>
          Products
        </NavLink>

        <NavLink to="/checkout" className={navClass}>
          Checkout

          {/* Cart badge */}
          {cartCount > 0 && (
            <span className="ml-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">
              {cartCount}
            </span>
          )}
        </NavLink>

        {/* Logout */}
        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}