import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, LogOut, Package, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';
import AuthModal from './AuthModal';

const Navbar = () => {
    const { cart, total, user, logout } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    const navLinks = [
        { name: 'Kisan Store', path: '/' },
        { name: 'Seeds', path: '/store?category=Seeds' },
        { name: 'Fertilizers', path: '/store?category=Fertilizers' },
        { name: 'Agri Advisory', path: '/agri-hub' },
        { name: 'My Orders', path: '/orders' },
    ];

    const getUserDisplayName = () => {
        if (!user) return '';
        if (user.user_metadata?.full_name) return user.user_metadata.full_name;
        if (user.email) return user.email.split('@')[0];
        return 'Kisan User';
    };

    const getUserInitial = () => {
        const name = getUserDisplayName();
        return name ? name.charAt(0).toUpperCase() : 'K';
    };

    return (
        <>
            <div className="px-4 pt-4 sticky top-0 z-40">
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

                                {/* User Auth Avatar / Login Trigger */}
                                <div className="relative">
                                    {user ? (
                                        <button
                                            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                            className="flex items-center gap-2 border border-brand-primary/20 p-1 rounded-full hover:bg-neutral-warm transition-colors"
                                        >
                                            <div className="w-7 h-7 bg-brand-primary text-white rounded-full flex items-center justify-center font-bold text-xs shadow-sm">
                                                {getUserInitial()}
                                            </div>
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => setIsAuthOpen(true)}
                                            className="bg-brand-primary text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-brand-dark transition-all shadow-md shadow-brand-primary/10 flex items-center gap-1.5"
                                        >
                                            <User className="w-3.5 h-3.5" />
                                            Sign In
                                        </button>
                                    )}

                                    {/* User Dropdown Menu */}
                                    <AnimatePresence>
                                        {isUserMenuOpen && user && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-neutral-border py-2 text-xs space-y-1 z-50"
                                            >
                                                <div className="px-4 py-2 border-b border-gray-100">
                                                    <p className="font-bold text-gray-900 truncate">{getUserDisplayName()}</p>
                                                    <p className="text-[10px] text-gray-400 truncate">{user.email}</p>
                                                </div>
                                                <Link
                                                    to="/orders"
                                                    onClick={() => setIsUserMenuOpen(false)}
                                                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-neutral-warm font-medium"
                                                >
                                                    <Package className="w-4 h-4 text-brand-primary" />
                                                    My Orders & Invoices
                                                </Link>
                                                <Link
                                                    to="/agri-hub"
                                                    onClick={() => setIsUserMenuOpen(false)}
                                                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-neutral-warm font-medium"
                                                >
                                                    <ShieldCheck className="w-4 h-4 text-brand-primary" />
                                                    Kisan Advisory Hub
                                                </Link>
                                                <button
                                                    onClick={async () => {
                                                        await logout();
                                                        setIsUserMenuOpen(false);
                                                        navigate('/');
                                                    }}
                                                    className="w-full text-left flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 font-bold border-t border-gray-100 mt-1"
                                                >
                                                    <LogOut className="w-4 h-4" />
                                                    Sign Out
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
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
                                    {!user && (
                                        <button
                                            onClick={() => {
                                                setIsMenuOpen(false);
                                                setIsAuthOpen(true);
                                            }}
                                            className="w-full text-left font-bold text-brand-primary uppercase tracking-widest text-sm pt-2 border-t border-gray-100"
                                        >
                                            Sign In / Register
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </nav>
            </div>

            <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
        </>
    );
};

export default Navbar;
