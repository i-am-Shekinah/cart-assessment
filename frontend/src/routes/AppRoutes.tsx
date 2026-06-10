import {
  Route,
  Routes,
} from 'react-router-dom';

import Checkout from '../pages/Checkout';
import Login from '../pages/Login';
import ProductDetails from '../pages/ProductDetails';
import Products from '../pages/Products';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/checkout" element={<Checkout />} />
        </Routes>
    )
}