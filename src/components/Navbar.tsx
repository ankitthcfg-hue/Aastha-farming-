import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Leaf, Search, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';

const Navbar = () => {
    const { cart } = useCart();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const location = useLocation();

    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    const navLinks = [
        { name: 'Kisan Store', path: '/' },
        { name: 'Seeds', path: '/store?category=Seeds' },
        { name: 'Fertilizers', path: '/store?category=Fertilizers' },
        { name: 'Tools', path: '/store?category=Tools' },
    ];

    return (
        <div className="px-4 pt-4 sticky top-0 z-50">
            <nav className="bg-white/90 backdrop-blur-md shadow-sm border border-neutral-border rounded-2xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-14 items-center">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center shadow-lg shadow-brand-primary/20">
                                <span className="text-white font-bold text-lg">A</span>
                            </div>
                            <div className="hidden sm:block">
                                <h1 className="text-base font-bold leading-none text-[#0B4D2C]">Aastha Farming</h1>
                                <p className="text-[8px] uppercase tracking-widest text-brand-primary font-bold">Kisan Store</p>
                            </div>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`text-xs font-bold uppercase tracking-wider transition-colors hover:text-brand-primary ${
                                        location.pathname + location.search === link.path ? 'text-brand-primary' : 'text-gray-500'
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        <div className="flex items-center gap-4">
                            <Link to="/cart" className="flex items-center gap-2 text-gray-700 hover:text-brand-primary transition-colors cursor-pointer p-1">
                                <div className="relative">
                                    <ShoppingCart className="w-5 h-5 text-brand-primary" />
                                    {cartCount > 0 && (
                                        <motion.span
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                                        >
                                            {cartCount}
                                        </motion.span>
                                    )}
                                </div>
                                <span className="text-xs font-bold hidden sm:block">₹{total.toLocaleString()}</span>
                            </Link>

                            <div className="w-8 h-8 rounded-full border-2 border-brand-primary p-0.5 cursor-pointer">
                                <div className="w-full h-full bg-[#D4E8D4] rounded-full flex items-center justify-center font-bold text-[10px] text-brand-primary">
                                    K
                                </div>
                            </div>

                            <button 
                                className="md:hidden p-1 text-gray-600"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-white border-t border-neutral-border overflow-hidden"
                        >
                            <div className="px-4 py-4 space-y-4">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className="block text-sm font-bold text-gray-600 hover:text-brand-primary uppercase tracking-widest"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </div>
    );
};

export default Navbar;
