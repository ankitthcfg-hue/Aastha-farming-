import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Store from './pages/Store';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-warm">
      <CartProvider>
        <Router>
          <Navbar />
          <main className="pb-12 text-[#1A2E1A]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/store" element={<Store />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CartPage />} /> {/* Same for now, just path exists */}
            </Routes>
          </main>
        </Router>
      </CartProvider>
    </div>
  );
}
