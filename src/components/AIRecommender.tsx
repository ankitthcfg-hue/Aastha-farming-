import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, Sparkles, Sprout, ShieldCheck, Zap, ChevronRight, X } from 'lucide-react';
import { getAIRecommendations, Recommendation } from '../services/geminiService';

const AIRecommender = () => {
    const [crop, setCrop] = useState('');
    const [loading, setLoading] = useState(false);
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const handleAsk = async () => {
        if (!crop.trim()) return;
        setLoading(true);
        try {
            const results = await getAIRecommendations(crop);
            setRecommendations(results);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="relative overflow-hidden bg-brand-primary/5 rounded-3xl p-6 sm:p-8 border border-brand-primary/10">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-brand-secondary/10 rounded-full blur-3xl" />
            
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1 space-y-4 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        <Bot className="w-3 h-3" />
                        AI Agronomist
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
                        Which crop do you <span className="text-brand-primary">want to grow?</span>
                    </h2>
                    <p className="text-gray-600 max-w-md mx-auto md:mx-0">
                        Our smart AI assistant will suggest the best seeds, fertilizers, and pesticides for your specific crop.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto md:mx-0">
                        <input
                            type="text"
                            value={crop}
                            onChange={(e) => setCrop(e.target.value)}
                            placeholder="e.g. Wheat, Basmati Rice, Soybean..."
                            className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all font-medium"
                        />
                        <button
                            onClick={handleAsk}
                            disabled={loading || !crop.trim()}
                            className="bg-brand-primary hover:bg-brand-dark text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Recommend
                                    <Sparkles className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </div>
                </div>

                <div className="flex-1 w-full max-w-sm sm:max-w-md">
                    <AnimatePresence mode="wait">
                        {recommendations.length > 0 ? (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-3"
                            >
                                {recommendations.map((rec, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 group hover:border-brand-primary/30 transition-colors"
                                    >
                                        <div className="bg-brand-primary/10 p-2 rounded-lg text-brand-primary group-hover:scale-110 transition-transform">
                                            {rec.type.toLowerCase().includes('seed') && <Sprout className="w-5 h-5" />}
                                            {rec.type.toLowerCase().includes('fertilizer') && <Zap className="w-5 h-5" />}
                                            {rec.type.toLowerCase().includes('pesticide') && <ShieldCheck className="w-5 h-5" />}
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{rec.type}</div>
                                            <div className="font-bold text-sm text-gray-900 mb-1">{rec.productName}</div>
                                            <p className="text-xs text-gray-500 leading-relaxed">{rec.reason}</p>
                                        </div>
                                    </motion.div>
                                ))}
                                <button 
                                    onClick={() => setRecommendations([])}
                                    className="text-xs font-bold text-gray-400 hover:text-red-500 transition-colors w-full text-center py-2"
                                >
                                    Clear Recommendations
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-brand-primary/20 rounded-3xl text-gray-400"
                            >
                                <Bot className="w-12 h-12 mb-4 opacity-20" />
                                <p className="text-sm font-medium italic">Waiting for your input...</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default AIRecommender;
