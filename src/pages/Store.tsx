import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal, LayoutGrid, List as ListIcon, X, Filter } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { MOCK_PRODUCTS } from '../constants';
import { Product } from '../lib/supabase';

const Store = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
    const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);

    const categories = ['All', 'Seeds', 'Fertilizers', 'Pesticides', 'Tools'];

    useEffect(() => {
        const cat = searchParams.get('category');
        if (cat) setSelectedCategory(cat);
    }, [searchParams]);

    useEffect(() => {
        let filtered = MOCK_PRODUCTS;
        
        if (selectedCategory !== 'All') {
            filtered = filtered.filter(p => p.category === selectedCategory);
        }

        if (searchQuery) {
            filtered = filtered.filter(p => 
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

        setProducts(filtered);
    }, [selectedCategory, searchQuery, priceRange]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            {/* Header & Search */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between pb-6 border-b border-neutral-border">
                <div className="w-full md:w-auto">
                    <h1 className="text-3xl font-serif italic text-brand-secondary">Explore <span className="text-brand-primary">Kisan Store</span></h1>
                    <p className="text-[10px] font-bold text-[#7A8B7A] uppercase tracking-widest mt-1">Quality Farming Inputs</p>
                </div>
                <div className="relative w-full md:max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A8B7A]" />
                    <input
                        type="text"
                        placeholder="Search seeds, tools, fertilizers..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white border border-neutral-border rounded-full pl-12 pr-4 py-2 text-sm focus:ring-2 focus:ring-brand-primary transition-all font-medium shadow-sm outline-none"
                    />
                </div>
            </div>

            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8">
                {/* Sidebar Filters */}
                <aside className="hidden lg:block lg:col-span-3 space-y-8 shrink-0">
                    <div className="space-y-4">
                        <h3 className="font-serif italic font-bold text-gray-900 border-b border-neutral-border pb-2">Categories</h3>
                        <div className="space-y-2">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`w-full text-left px-4 py-2 rounded-xl text-xs font-bold tracking-wider transition-all border ${
                                        selectedCategory === cat 
                                        ? 'bg-brand-primary text-white border-brand-primary shadow-sm' 
                                        : 'text-gray-500 hover:bg-white border-transparent'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-serif italic font-bold text-gray-900 border-b border-neutral-border pb-2">Price Filter</h3>
                        <div className="px-1 pt-2">
                            <input 
                                type="range" 
                                min="0" 
                                max="10000" 
                                step="100"
                                value={priceRange[1]}
                                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                className="w-full h-1 bg-[#D4E8D4] rounded-lg appearance-none cursor-pointer accent-brand-primary"
                            />
                            <div className="flex justify-between mt-3 text-[10px] font-black text-[#7A8B7A] uppercase tracking-widest">
                                <span>₹0</span>
                                <span>₹{priceRange[1]}</span>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Mobile Filters Toggle */}
                <div className="lg:hidden flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                                selectedCategory === cat 
                                ? 'bg-brand-primary text-white border-brand-primary' 
                                : 'bg-white text-gray-500 border-neutral-border'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Main Grid */}
                <div className="lg:col-span-9">
                    <AnimatePresence mode="popLayout">
                        {products.length > 0 ? (
                            <motion.div
                                layout
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                {products.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center py-24 text-gray-400 bg-white rounded-3xl border-2 border-dashed border-gray-100"
                            >
                                <LayoutGrid className="w-16 h-16 mb-4 opacity-10" />
                                <p className="font-bold text-lg">No products found</p>
                                <p className="text-sm">Try adjusting your filters or search query</p>
                                <button 
                                    onClick={() => { setSelectedCategory('All'); setSearchQuery(''); setPriceRange([0, 10000]); }}
                                    className="mt-6 text-brand-primary font-black text-sm underline"
                                >
                                    Clear all filters
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Store;
