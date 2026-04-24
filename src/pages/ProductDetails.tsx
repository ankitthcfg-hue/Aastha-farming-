import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
    ChevronLeft, Star, ShoppingCart, ShieldCheck, 
    Truck, RefreshCw, Minus, Plus, Share2, Heart,
    Sprout, Info, MessageSquare
} from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';
import { Product } from '../lib/supabase';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [isAdding, setIsAdding] = useState(false);
    const [activeTab, setActiveTab] = useState<'description' | 'instructions' | 'reviews'>('description');

    useEffect(() => {
        const found = MOCK_PRODUCTS.find(p => p.id === id);
        if (found) {
            setProduct(found);
            window.scrollTo(0, 0);
        }
    }, [id]);

    if (!product) return (
        <div className="flex flex-col items-center justify-center h-[70vh]">
            <div className="animate-pulse flex flex-col items-center">
                <Leaf className="w-12 h-12 text-brand-primary mb-4 opacity-50" />
                <p className="text-gray-400 font-bold">Product not found...</p>
            </div>
            <Link to="/store" className="mt-4 text-brand-primary font-bold underline">Back to Store</Link>
        </div>
    );

    const handleAddToCart = async () => {
        setIsAdding(true);
        await addToCart(product, quantity);
        setTimeout(() => {
            setIsAdding(false);
            navigate('/cart');
        }, 800);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-500 hover:text-brand-primary font-bold text-sm mb-8 transition-colors group"
            >
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Product Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative aspect-square rounded-[40px] overflow-hidden shadow-2xl bg-white border border-gray-100"
                >
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute top-6 right-6 flex flex-col gap-3">
                        <button className="bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl text-gray-400 hover:text-red-500 transition-colors">
                            <Heart className="w-5 h-5" />
                        </button>
                        <button className="bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl text-gray-400 hover:text-brand-primary transition-colors">
                            <Share2 className="w-5 h-5" />
                        </button>
                    </div>
                </motion.div>

                {/* Product Info */}
                <div className="space-y-8">
                    <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 text-brand-primary text-[10px] font-black uppercase tracking-[0.2em] mb-1">
                            {product.category}
                        </div>
                        <h1 className="text-3xl sm:text-5xl font-serif italic font-bold text-brand-secondary leading-tight">
                            {product.name}
                        </h1>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <Star key={i} className={`w-3 h-3 ${i <= 4 ? 'text-yellow-500 fill-current' : 'text-gray-200'}`} />
                                ))}
                                <span className="ml-2 text-[10px] font-bold text-[#7A8B7A] uppercase">4.0 Recommendation</span>
                            </div>
                            <div className="w-px h-3 bg-neutral-border" />
                            <span className="text-[10px] font-bold text-brand-primary uppercase">Direct from Source</span>
                        </div>
                    </div>

                    <div className="flex items-baseline gap-4">
                        <span className="text-4xl font-bold text-brand-secondary tracking-tight">₹{product.price}</span>
                        <span className="text-sm text-gray-400 line-through font-bold">₹{Math.round(product.price * 1.2)}</span>
                    </div>

                    <div className="space-y-6 pt-4">
                        {/* Quantity Selector */}
                        <div className="flex items-center gap-6">
                            <span className="font-bold text-[#1A2E1A] text-[10px] uppercase tracking-widest">Select Quantity</span>
                            <div className="flex items-center bg-white border border-neutral-border rounded-full p-1 shadow-sm">
                                <button 
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-warm hover:text-brand-primary transition-colors disabled:opacity-50"
                                    disabled={quantity <= 1}
                                >
                                    <Minus className="w-3 h-3" />
                                </button>
                                <span className="w-10 text-center font-bold text-[#1A2E1A] text-sm">{quantity}</span>
                                <button 
                                    onClick={() => setQuantity(q => q + 1)}
                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-warm hover:text-brand-primary transition-colors"
                                >
                                    <Plus className="w-3 h-3" />
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={handleAddToCart}
                                disabled={isAdding}
                                className="flex-1 btn-primary py-4 text-xs tracking-widest flex items-center justify-center gap-2"
                            >
                                {isAdding ? (
                                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <ShoppingCart className="w-4 h-4" />
                                        ADD TO CART
                                    </>
                                )}
                            </button>
                            <button className="flex-1 bg-brand-secondary text-white py-4 rounded-full font-bold text-xs tracking-widest shadow-md transition-all hover:bg-brand-dark active:scale-95">
                                BUY NOW
                            </button>
                        </div>
                    </div>

                    {/* Features List */}
                    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
                        <div className="space-y-1 text-center">
                            <Truck className="w-5 h-5 text-gray-400 mx-auto" />
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Pan India delivery</p>
                        </div>
                        <div className="space-y-1 text-center">
                            <ShieldCheck className="w-5 h-5 text-gray-400 mx-auto" />
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Quality Insured</p>
                        </div>
                        <div className="space-y-1 text-center">
                            <RefreshCw className="w-5 h-5 text-gray-400 mx-auto" />
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">7 Day Return</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs Section */}
            <div className="mt-20">
                <div className="flex gap-8 border-b border-gray-100">
                    {[
                        { id: 'description', label: 'Description', icon: Info },
                        { id: 'instructions', label: 'How to use', icon: Sprout },
                        { id: 'reviews', label: 'Reviews', icon: MessageSquare },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex items-center gap-2 pb-4 text-sm font-black uppercase tracking-widest transition-all relative ${
                                activeTab === tab.id ? 'text-brand-primary' : 'text-gray-400 hover:text-gray-600'
                            }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                            {activeTab === tab.id && (
                                <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-brand-primary rounded-full" />
                            )}
                        </button>
                    ))}
                </div>
                <div className="py-12 px-6 bg-white rounded-b-3xl border border-t-0 border-gray-100">
                    <AnimatePresence mode="wait">
                        {activeTab === 'description' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="max-w-2xl text-gray-600 leading-relaxed space-y-4"
                            >
                                <p>{product.description}</p>
                                <h4 className="font-bold text-gray-900 pt-4">Key Benefits:</h4>
                                <ul className="list-disc list-inside space-y-2 text-sm italic">
                                    <li>Boosts yield by up to 25%</li>
                                    <li>Highly resistant to common diseases</li>
                                    <li>Tested across various soil conditions</li>
                                    <li>Certified organic origins</li>
                                </ul>
                            </motion.div>
                        )}
                        {activeTab === 'instructions' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="max-w-2xl text-gray-600 leading-relaxed"
                            >
                                <div className="bg-brand-primary/5 p-6 rounded-3xl border border-brand-primary/10">
                                    <h4 className="font-bold text-brand-primary mb-4 flex items-center gap-2">
                                        <Zap className="w-4 h-4" />
                                        Recommended Application
                                    </h4>
                                    <p className="text-sm font-medium italic">"{product.instructions || 'Always read the label before application. Consult with a local agronomist for specific area requirements.'}"</p>
                                </div>
                            </motion.div>
                        )}
                        {activeTab === 'reviews' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-8"
                            >
                                {[1, 2].map(i => (
                                    <div key={i} className="flex gap-4 items-start">
                                        <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center font-black text-gray-400">AJ</div>
                                        <div className="space-y-1 flex-1">
                                            <div className="flex justify-between">
                                                <h5 className="font-bold text-gray-900">Ankit J.</h5>
                                                <span className="text-xs text-gray-400 font-bold">2 days ago</span>
                                            </div>
                                            <div className="flex gap-1">
                                                {[1, 2, 3, 4, 5].map(j => <Star key={j} className="w-3 h-3 text-yellow-500 fill-current" />)}
                                            </div>
                                            <p className="text-sm text-gray-500 leading-relaxed pt-1 italic">"Excellent product. Saw visible results in 15 days. Highly recommend for any serious wheat farmer."</p>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

// Internal helper
import { Leaf } from 'lucide-react';

export default ProductDetails;
