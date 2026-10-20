import React from 'react';
import { motion } from 'motion/react';
import { Sprout, Sun, Droplets, Bug, PhoneCall, Calendar, BookOpen, ShieldAlert, Award } from 'lucide-react';
import AIRecommender from '../components/AIRecommender';

const AgriHub = () => {
    const seasonalTips = [
        {
            title: 'Rabi Season Soil Preparation',
            season: 'Rabi Crop Focus',
            icon: Sun,
            desc: 'Ensure balanced NPK soil treatment before sowing Wheat and Mustard. Incorporate organic manure 15 days prior.'
        },
        {
            title: 'Water Management in Paddy',
            season: 'Irrigation Advisory',
            icon: Droplets,
            desc: 'Maintain 2-5 cm water level during tillering phase to avoid weed emergence and maximize root strength.'
        },
        {
            title: 'Pest Alert: Yellow Rust Control',
            season: 'Crop Health Alert',
            icon: Bug,
            desc: 'Inspect wheat fields weekly. Spray Propiconazole 25% EC at initial yellowing symptoms.'
        }
    ];

    const cropGuides = [
        { name: 'Wheat (Gehun)', duration: '120-135 Days', yield: '20-25 Qtl/Acre', keyInput: 'HD-2967 Seeds + Urea Split Doses' },
        { name: 'Mustard (Sarson)', duration: '110-125 Days', yield: '8-12 Qtl/Acre', keyInput: 'Pusa Bold Seeds + Sulfur Fertilizer' },
        { name: 'Paddy (Dhan)', duration: '130-150 Days', yield: '25-30 Qtl/Acre', keyInput: 'Pusa Basmati 1121 + Bio-fertilizers' },
        { name: 'Gram (Chana)', duration: '100-120 Days', yield: '8-10 Qtl/Acre', keyInput: 'Rhizobium Culture + NPK Spray' }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
            {/* Header Banner */}
            <div className="bg-[#1A2E1A] text-white rounded-[40px] p-8 sm:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-brand-primary/20 rounded-full blur-3xl -mr-20 -mt-20" />
                <div className="relative z-10 max-w-2xl space-y-4">
                    <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] border border-white/20 text-[#98D8AA]">
                        <Sprout className="w-4 h-4" /> Kisan Salah Kendra
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-serif italic leading-tight">
                        Expert Agricultural Advisory & Crop Care
                    </h1>
                    <p className="text-white/80 text-sm leading-relaxed font-medium">
                        Scientific crop management advice, seasonal alerts, disease prevention guides, and direct consultation for high-yield farming.
                    </p>
                    <div className="pt-2 flex flex-wrap gap-4">
                        <a href="tel:18001234567" className="bg-[#98D8AA] text-[#0B4D2C] px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-white transition-all shadow-lg">
                            <PhoneCall className="w-4 h-4" />
                            Kisan Helpline: 1800-123-4567
                        </a>
                    </div>
                </div>
            </div>

            {/* AI Agronomist Section */}
            <section className="bg-white rounded-[32px] p-6 sm:p-8 border border-neutral-border shadow-sm">
                <AIRecommender />
            </section>

            {/* Seasonal Tips */}
            <section className="space-y-6">
                <div>
                    <h2 className="text-2xl font-serif italic text-brand-secondary">Seasonal Farming Advisories</h2>
                    <p className="text-[10px] font-bold text-[#7A8B7A] uppercase tracking-widest mt-1">Timely Guidance for Maximum Yield</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {seasonalTips.map((tip, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -6 }}
                            className="bg-white p-6 rounded-[28px] border border-neutral-border space-y-4 shadow-sm"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                                <tip.icon className="w-6 h-6" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary">{tip.season}</span>
                            <h3 className="font-serif italic font-bold text-lg text-gray-900">{tip.title}</h3>
                            <p className="text-xs text-gray-600 leading-relaxed">{tip.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Crop Cultivation Guides */}
            <section className="space-y-6">
                <div>
                    <h2 className="text-2xl font-serif italic text-brand-secondary">Major Crop Cultivation Guides</h2>
                    <p className="text-[10px] font-bold text-[#7A8B7A] uppercase tracking-widest mt-1">Duration, Expected Yield & Input Plan</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {cropGuides.map((crop, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-[28px] border border-neutral-border space-y-3">
                            <div className="flex items-center gap-2 text-brand-primary">
                                <BookOpen className="w-5 h-5" />
                                <h3 className="font-bold text-sm text-gray-900">{crop.name}</h3>
                            </div>
                            <div className="text-xs space-y-1 text-gray-600 border-t border-gray-100 pt-3">
                                <p><strong className="text-gray-800">Duration:</strong> {crop.duration}</p>
                                <p><strong className="text-gray-800">Yield:</strong> {crop.yield}</p>
                                <p><strong className="text-gray-800">Key Input:</strong> {crop.keyInput}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AgriHub;
