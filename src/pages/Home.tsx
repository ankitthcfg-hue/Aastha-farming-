import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Sprout, Leaf, Zap, Tractor, ChevronRight, ArrowRight, ShieldCheck, Truck, CreditCard, Sparkles } from 'lucide-react';
import AIRecommender from '../components/AIRecommender';
import ProductCard from '../components/ProductCard';
import { MOCK_PRODUCTS } from '../constants';

const Home = () => {
    const categories = [
        { name: 'Seeds', icon: Sprout, color: 'text-[#1B8F4D]', bg: 'bg-[#E8F5EE]', count: '120+ Varieties' },
        { name: 'Fertilizers', icon: Zap, color: 'text-[#C88E2E]', bg: 'bg-[#FEF6E8]', count: '85+ Premium' },
        { name: 'Pesticides', icon: ShieldCheck, color: 'text-[#9F4B3C]', bg: 'bg-[#F9EDEB]', count: '60+ Certified' },
        { name: 'Tools', icon: Tractor, color: 'text-[#3E5C76]', bg: 'bg-[#EDF2F7]', count: '45+ Essential' },
    ];

    return (
        <div className="space-y-20 pb-20">
            {/* Hero Section */}
            <section className="relative h-[550px] sm:h-[650px] flex items-center overflow-hidden rounded-b-[60px] sm:rounded-b-[100px] shadow-2xl">
                <div className="absolute inset-0 hero-gradient opacity-90 z-10" />
                <img
                    src="https://images.unsplash.com/photo-1495107336217-11382920775a?auto=format&fit=crop&q=80&w=1600"
                    alt="Farming Background"
                    className="absolute inset-0 w-full h-full object-cover scale-110"
                />
                <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-2xl space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-[10px] font-bold uppercase tracking-[0.2em]">
                            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                            Trusted by 10k+ Indian Farmers
                        </div>
                        <h1 className="text-5xl sm:text-7xl font-serif italic leading-[1.1] tracking-tight">
                            Elevate Your <span className="text-[#98D8AA]">Harvest</span> with <span className="text-white">Expert Picks</span>
                        </h1>
                        <p className="text-lg text-white/80 font-medium max-w-lg leading-relaxed">
                            Premium agricultural inputs delivered to your village. Quality-tested seeds, 
                            organic fertilizers, and modern tools for a bountiful season.
                        </p>
                        <div className="flex flex-wrap gap-5 pt-4">
                            <Link to="/store" className="bg-[#98D8AA] hover:bg-white text-[#0B4D2C] px-10 py-4 rounded-full font-bold transition-all flex items-center gap-2 shadow-xl hover:shadow-[#98D8AA]/20">
                                Start Shopping
                                <ChevronRight className="w-5 h-5" />
                            </Link>
                            <button className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-10 py-4 rounded-full font-bold transition-all border border-white/20">
                                Seasonal Offers
                            </button>
                        </div>
                    </motion.div>
                </div>
                
                {/* Decorative Element */}
                <div className="absolute bottom-[-1px] left-0 right-0 h-24 bg-neutral-warm clip-path-curve" />
            </section>

            {/* Categories */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-serif italic text-brand-secondary">Browse Departments</h2>
                        <p className="text-[#7A8B7A] text-sm uppercase tracking-widest font-bold mt-1">Foundational Farm Supplies</p>
                    </div>
                    <Link to="/store" className="text-brand-primary font-bold text-sm hover:translate-x-1 transition-transform flex items-center gap-2">
                        Marketplace <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    {categories.map((cat) => (
                        <Link key={cat.name} to={`/store?category=${cat.name}`}>
                            <motion.div
                                whileHover={{ y: -8 }}
                                className="bg-white p-8 rounded-[2.5rem] border border-neutral-border text-center hover:shadow-xl transition-all duration-500 group relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <cat.icon className="w-16 h-16 rotate-12" />
                                </div>
                                <div className={`${cat.bg} ${cat.color} w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                                    <cat.icon className="w-10 h-10" />
                                </div>
                                <h3 className="font-serif text-xl text-gray-900 mb-1 italic">{cat.name}</h3>
                                <p className="text-[10px] font-black text-[#7A8B7A] uppercase tracking-[0.15em]">{cat.count}</p>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* AI Section - Full Width Background */}
            <section className="bg-white py-24 border-y border-neutral-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AIRecommender />
                </div>
            </section>

            {/* Featured Products */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-serif italic text-brand-secondary">Best Sellers</h2>
                        <p className="text-[#7A8B7A] text-sm uppercase tracking-widest font-bold mt-1">Recommended by Aastha Farming Expert Community</p>
                    </div>
                    <Link to="/store" className="bg-white border border-neutral-border px-6 py-2 rounded-full text-brand-primary font-bold text-sm hover:bg-neutral-warm transition-colors">
                        Explore Full Store
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {MOCK_PRODUCTS.slice(0, 4).map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>

            {/* Trust Badges - Refined */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-[#1A2E1A] rounded-[3rem] p-10 sm:p-16 text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl -mr-32 -mt-32" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center">
                                <Truck className="w-8 h-8 text-[#98D8AA]" />
                            </div>
                            <h4 className="font-serif text-xl italic">Rural Logistics</h4>
                            <p className="text-white/60 text-sm leading-relaxed">Efficient delivery network covering 15,000+ pin codes across India.</p>
                        </div>
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center">
                                <ShieldCheck className="w-8 h-8 text-[#98D8AA]" />
                            </div>
                            <h4 className="font-serif text-xl italic">Quality Promise</h4>
                            <p className="text-white/60 text-sm leading-relaxed">Every batch is lab-tested and verified for purity and germination rate.</p>
                        </div>
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center">
                                <CreditCard className="w-8 h-8 text-[#98D8AA]" />
                            </div>
                            <h4 className="font-serif text-xl italic">Safe Payments</h4>
                            <p className="text-white/60 text-sm leading-relaxed">Multiple secure payment options including UPI, Cards, and Wallet.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;

