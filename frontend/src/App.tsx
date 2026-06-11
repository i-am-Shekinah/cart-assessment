import { useEffect } from 'react';

import {
  useLocation,
  useNavigate,
} from 'react-router-dom';

import AppRoutes from './routes/AppRoutes';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // If user is logged in and is on login/register page
    if (token) {
      if (location.pathname === "/" || location.pathname === "/register") {
        navigate("/products", { replace: true });
      }
    }
  }, [location.pathname, navigate]);

  return <AppRoutes />;
}

export default App;