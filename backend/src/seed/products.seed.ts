import dotenv from 'dotenv';
import mongoose from 'mongoose';

import { Product } from '../modules/products/products.model.js';

dotenv.config();

const products = [
  {
    name: "iPhone 15",
    description: "Latest Apple smartphone with A16 chip",
    price: 1800000,
    category: "Electronics",
    imageUrl: "https://example.com/iphone.jpg",
  },
  {
    name: "MacBook Air M2",
    description: "Lightweight and powerful laptop from Apple",
    price: 2500000,
    category: "Electronics",
    imageUrl: "https://example.com/macbook.jpg",
  },
  {
    name: "Nike Air Max",
    description: "Comfortable running shoes",
    price: 300000,
    category: "Fashion",
    imageUrl: "https://example.com/nike.jpg",
  },
  {
    name: "Harry Potter Book Set",
    description: "Complete fantasy novel collection",
    price: 120000,
    category: "Books",
    imageUrl: "https://example.com/books.jpg",
  },
  {
    name: "Office Chair",
    description: "Ergonomic chair for productivity",
    price: 300000,
    category: "Home",
    imageUrl: "https://example.com/chair.jpg",
  },
  {
    name: "Macbook Pro M5",
    description: "Fast and Sleek",
    price: 7000000,
    category: "Electronics",
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);

    console.log("Connected to MongoDB");

    // Optional: clear existing products
    await Product.deleteMany();

    // insert seed data
    await Product.insertMany(products);

    console.log("Products seeded successfully");

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedDB();
