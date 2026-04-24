import React from 'react';
import { Product } from '../lib/supabase';
import { useCart } from '../context/CartContext';
import { motion } from 'motion/react';
import { ShoppingCart, Star, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart } = useCart();
    const [isAdding, setIsAdding] = React.useState(false);

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsAdding(true);
        await addToCart(product);
        setTimeout(() => setIsAdding(false), 1000);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            className="card group h-full flex flex-col"
        >
            <Link to={`/product/${product.id}`} className="relative block aspect-[4/3] overflow-hidden">
                <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-[10px] font-bold text-brand-primary uppercase tracking-wider border border-brand-primary/20">
                    {product.category}
                </div>
                {product.stock < 10 && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg">
                        Low Stock
                    </div>
                )}
            </Link>

            <div className="p-4 flex-1 flex flex-col gap-2">
                <div className="flex justify-between items-start">
                    <Link to={`/product/${product.id}`}>
                        <h3 className="font-bold text-gray-900 group-hover:text-brand-primary transition-colors text-sm sm:text-base leading-tight">
                            {product.name}
                        </h3>
                    </Link>
                    <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="text-xs font-bold text-gray-500">4.5</span>
                    </div>
                </div>
                
                <p className="text-xs text-gray-500 line-clamp-2">
                    {product.description}
                </p>

                <div className="mt-auto pt-3 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-400 font-medium">Price</span>
                        <span className="text-lg font-black text-gray-900">₹{product.price}</span>
                    </div>
                    
                    <button
                        onClick={handleAddToCart}
                        disabled={isAdding}
                        className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all shadow-md group ${
                            isAdding ? 'bg-green-100 text-brand-primary' : 'bg-brand-primary text-white hover:bg-brand-dark'
                        }`}
                    >
                        {isAdding ? <ShoppingCart className="w-5 h-5 animate-bounce" /> : <Plus className="w-5 h-5" />}
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
