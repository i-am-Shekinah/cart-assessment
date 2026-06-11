import { useState } from 'react';

import {
  Link,
  useNavigate,
} from 'react-router-dom';

import { register } from '../api/auth';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });

  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await register(form);

      loginUser(res.token);
      navigate("/products");
    } catch (err: any) {
      alert(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-96"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">
          Create Account
        </h1>

        <div className="space-y-3">
          <input
            name="firstName"
            placeholder="First Name"
            className="w-full p-2 border rounded"
            onChange={handleChange}
          />

          <input
            name="lastName"
            placeholder="Last Name"
            className="w-full p-2 border rounded"
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            onChange={handleChange}
          />

          <input
            name="username"
            placeholder="Username"
            className="w-full p-2 border rounded"
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            onChange={handleChange}
          />
        </div>

        <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 mt-5">
          Register
        </button>

        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/" className="text-indigo-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}