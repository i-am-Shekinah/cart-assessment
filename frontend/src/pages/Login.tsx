import { useState } from 'react';

import {
  Link,
  useNavigate,
} from 'react-router-dom';

import { login } from '../api/auth';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await login({ username, password });

      loginUser(res.token);
      navigate("/products");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-96"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">
          Login
        </h1>

        <input
          className="w-full mb-3 p-2 border rounded"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="w-full mb-5 p-2 border rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
          Login
        </button>

        <Link to="/register" className="text-indigo-600">
          Create account
        </Link>
      </form>
    </div>
  );
}
