import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const CartPage = () => {
    const { cart, removeFromCart, updateQuantity, total } = useCart();
    const navigate = useNavigate();

    if (cart.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24 px-4 text-center space-y-6">
                <div className="bg-gray-100 p-8 rounded-[40px]">
                    <ShoppingBag className="w-16 h-16 text-gray-300" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-3xl font-black text-gray-900">Your cart is empty</h2>
                    <p className="text-gray-500 font-medium">Looks like you haven't added anything to your cart yet.</p>
                </div>
                <Link 
                    to="/store" 
                    className="bg-brand-primary hover:bg-brand-dark text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-brand-primary/20 inline-flex items-center gap-2"
                >
                    Explore Store
                    <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center gap-3 mb-10">
                <div className="bg-brand-primary p-3 rounded-2xl">
                    <ShoppingCart className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-4xl font-black text-gray-900">Shopping <span className="text-brand-primary">Cart</span></h1>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 items-start">
                {/* Cart Items */}
                <div className="xl:col-span-2 space-y-6">
                    <AnimatePresence>
                        {cart.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="bg-white rounded-[32px] p-4 sm:p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-6 items-center"
                            >
                                <Link to={`/product/${item.product_id}`} className="w-32 h-32 rounded-2xl overflow-hidden shrink-0 border border-gray-100 shadow-inner">
                                    <img
                                        src={item.product?.image_url}
                                        alt={item.product?.name}
                                        className="w-full h-full object-cover"
                                    />
                                </Link>
                                
                                <div className="flex-1 space-y-2 text-center sm:text-left min-w-0">
                                    <div className="text-[10px] font-black text-brand-primary uppercase tracking-widest">{item.product?.category}</div>
                                    <h3 className="text-lg font-black text-gray-900 truncate tracking-tight">{item.product?.name}</h3>
                                    <div className="text-xs font-bold text-gray-400">Sold by Aastha Farming Official</div>
                                    <p className="text-sm font-black text-brand-primary pt-2">₹{item.product?.price} <span className="text-xs text-gray-400">/ unit</span></p>
                                </div>

                                <div className="flex flex-col items-center sm:items-end gap-4">
                                    <div className="flex items-center bg-gray-50 rounded-2xl p-1 border border-gray-100">
                                        <button 
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="w-8 h-8 flex items-center justify-center rounded-xl bg-white shadow-sm hover:text-brand-primary transition-all disabled:opacity-50"
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="w-10 text-center font-black text-gray-900 text-sm">{item.quantity}</span>
                                        <button 
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="w-8 h-8 flex items-center justify-center rounded-xl bg-white shadow-sm hover:text-brand-primary transition-all"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <button 
                                        onClick={() => removeFromCart(item.id)}
                                        className="p-2 text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1 group"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        <span className="text-[10px] font-black uppercase tracking-widest group-hover:underline">Remove</span>
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Summary */}
                <div className="space-y-6">
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-neutral-border relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full -mr-16 -mt-16 blur-2xl" />
                        
                        <h2 className="text-xl font-serif italic font-bold text-brand-secondary mb-6 tracking-tight">Order Details</h2>
                        
                        <div className="space-y-4 text-[10px] font-bold uppercase tracking-widest">
                            <div className="flex justify-between text-[#7A8B7A]">
                                <span>Subtotal ({cart.length} items)</span>
                                <span className="text-[#1A2E1A]">₹{total}</span>
                            </div>
                            <div className="flex justify-between text-[#7A8B7A]">
                                <span>Delivery Fee</span>
                                <span className="text-brand-primary font-black">₹0</span>
                            </div>
                            <div className="pt-4 border-t border-neutral-border">
                                <div className="flex justify-between text-base font-serif italic text-brand-secondary lowercase">
                                    <span className="capitalize">Total focus</span>
                                    <span className="text-xl not-italic font-sans font-bold">₹{total}</span>
                                </div>
                            </div>
                        </div>

                        <button 
                            onClick={() => navigate('/checkout')}
                            className="w-full mt-8 bg-brand-primary hover:bg-brand-secondary text-white py-4 rounded-full font-bold text-xs tracking-[0.2em] shadow-lg shadow-brand-primary/10 transition-all flex items-center justify-center gap-3 active:scale-95 group uppercase"
                        >
                            Checkout now
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <div className="mt-8 flex items-center justify-center gap-3 grayscale opacity-30">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" alt="Razorpay" className="h-4" />
                            <div className="w-px h-3 bg-neutral-border" />
                            <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Secure Gateway</p>
                        </div>
                    </div>

                    <div className="bg-[#F0F4F0] rounded-2xl p-6 border border-[#E0E8E0] text-center">
                        <p className="text-[10px] font-bold text-brand-primary uppercase tracking-widest leading-loose">
                             🌱 Aastha Farming Promise<br/>
                             <span className="text-[#4A5A4A] italic normal-case tracking-normal font-medium text-xs">\"Supporting the backbone of India - our farmers.\"</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
