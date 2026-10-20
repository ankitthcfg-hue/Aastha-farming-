import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Store from './pages/Store';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import AgriHub from './pages/AgriHub';
import { CartProvider } from './context/CartContext';

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-warm flex flex-col justify-between">
      <CartProvider>
        <Router>
          <Navbar />
          <main className="pb-12 text-[#1A2E1A] flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/store" element={<Store />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/agri-hub" element={<AgriHub />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </CartProvider>
    </div>
  );
}
