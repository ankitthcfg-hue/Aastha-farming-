import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, PhoneCall, Mail, MapPin, ShieldCheck, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#1A2E1A] text-white pt-16 pb-8 border-t border-white/10 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Column 1: Brand Info */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-[#98D8AA] text-[#0B4D2C] rounded-lg flex items-center justify-center font-bold text-lg">
                                A
                            </div>
                            <div>
                                <h3 className="text-lg font-serif italic text-white leading-none">Aastha Farming</h3>
                                <p className="text-[8px] uppercase tracking-widest text-[#98D8AA] font-bold">Kisan Store</p>
                            </div>
                        </div>
                        <p className="text-xs text-white/70 leading-relaxed">
                            Empowering Indian farmers with certified seeds, genuine bio-fertilizers, effective crop protection, and AI agronomist support.
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-[#98D8AA]">Explore Categories</h4>
                        <ul className="space-y-2 text-xs text-white/70">
                            <li><Link to="/store?category=Seeds" className="hover:text-white transition-colors">High-Yield Seeds</Link></li>
                            <li><Link to="/store?category=Fertilizers" className="hover:text-white transition-colors">Organic Fertilizers</Link></li>
                            <li><Link to="/store?category=Pesticides" className="hover:text-white transition-colors">Crop Protection</Link></li>
                            <li><Link to="/store?category=Tools" className="hover:text-white transition-colors">Farming Implements</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Customer Care & App Features */}
                    <div className="space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-[#98D8AA]">Farmer Services</h4>
                        <ul className="space-y-2 text-xs text-white/70">
                            <li><Link to="/agri-hub" className="hover:text-white transition-colors">Kisan Salah Kendra (AI Advice)</Link></li>
                            <li><Link to="/orders" className="hover:text-white transition-colors">Track Order & Delivery Status</Link></li>
                            <li><Link to="/cart" className="hover:text-white transition-colors">Cart & Quick Checkout</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Contact Helpline */}
                    <div className="space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-[#98D8AA]">Kisan Support Helpline</h4>
                        <div className="space-y-2 text-xs text-white/70">
                            <p className="flex items-center gap-2">
                                <PhoneCall className="w-4 h-4 text-[#98D8AA]" />
                                <span>Toll Free: 1800-123-4567</span>
                            </p>
                            <p className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-[#98D8AA]" />
                                <span>support@aasthafarming.com</span>
                            </p>
                            <p className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 text-[#98D8AA] shrink-0 mt-0.5" />
                                <span>Aastha Agri Tech Hub, Bareilly, Uttar Pradesh - 243001</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center text-[10px] text-white/50 gap-4">
                    <p>© {new Date().getFullYear()} Aastha Farming Ltd. All Rights Reserved.</p>
                    <div className="flex items-center gap-1">
                        <span>Made with</span>
                        <Heart className="w-3 h-3 text-red-400 fill-current" />
                        <span>for Indian Farmers</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
