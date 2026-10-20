import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Package, Truck, CheckCircle, Clock, Download, ArrowRight, MapPin, ShoppingBag } from 'lucide-react';

interface OrderRecord {
    id: string;
    date: string;
    items: any[];
    total: number;
    status: string;
    paymentRef: string;
    shippingAddress: {
        fullName: string;
        phone: string;
        address: string;
        city: string;
        state: string;
        pincode: string;
    };
    paymentMethod: string;
}

const Orders = () => {
    const [orders, setOrders] = useState<OrderRecord[]>([]);

    useEffect(() => {
        const savedOrders = JSON.parse(localStorage.getItem('aastha_orders') || '[]');
        if (savedOrders.length === 0) {
            // Load mock sample order for illustration
            const sampleOrder: OrderRecord = {
                id: 'ORD-894210',
                date: '12 May 2024',
                items: [
                    {
                        id: 's1',
                        quantity: 2,
                        product: {
                            id: 'p1',
                            name: 'Hybrid Wheat Seeds (HD-2967)',
                            price: 850,
                            category: 'Seeds',
                            image_url: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=400'
                        }
                    }
                ],
                total: 1700,
                status: 'In Transit',
                paymentRef: 'PAY-98124',
                shippingAddress: {
                    fullName: 'Ramesh Singh',
                    phone: '9876543210',
                    address: 'Farm House No. 4, Village Rampur',
                    city: 'Bareilly',
                    state: 'Uttar Pradesh',
                    pincode: '243001'
                },
                paymentMethod: 'UPI'
            };
            setOrders([sampleOrder]);
        } else {
            setOrders(savedOrders);
        }
    }, []);

    const handleDownloadInvoice = (order: OrderRecord) => {
        const invoiceContent = `
===================================================
             AASTHA FARMING KISAN STORE
                  TAX INVOICE
===================================================
Order ID: ${order.id}
Order Date: ${order.date}
Payment Ref: ${order.paymentRef}
Status: ${order.status}

CUSTOMER DETAILS:
Name: ${order.shippingAddress.fullName}
Phone: ${order.shippingAddress.phone}
Address: ${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}

ORDER ITEMS:
---------------------------------------------------
${order.items.map(i => `${i.product?.name || 'Product'} x ${i.quantity} = ₹${(i.product?.price || 0) * i.quantity}`).join('\n')}
---------------------------------------------------
TOTAL AMOUNT PAID: ₹${order.total}

Thank you for trusting Aastha Farming!
For Help, Call Kisan Helpline: 1800-123-4567
===================================================
        `;

        const blob = new Blob([invoiceContent], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Invoice_${order.id}.txt`;
        link.click();
        URL.revokeObjectURL(url);
    };

    if (orders.length === 0) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-6">
                <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-gray-400">
                    <ShoppingBag className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-serif italic font-bold text-gray-900">No Orders Placed Yet</h2>
                <p className="text-gray-500 text-sm">Explore our store and order seeds, fertilizers, and tools.</p>
                <Link to="/store" className="inline-flex items-center gap-2 bg-brand-primary text-white font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-widest shadow-lg shadow-brand-primary/20 hover:bg-brand-dark transition-all">
                    Explore Store <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <div className="flex justify-between items-end border-b border-neutral-border pb-4">
                <div>
                    <h1 className="text-3xl font-serif italic text-brand-secondary">My Orders & Tracking</h1>
                    <p className="text-[10px] font-bold text-[#7A8B7A] uppercase tracking-widest mt-1">Track your farm deliveries</p>
                </div>
            </div>

            <div className="space-y-6">
                {orders.map((order) => (
                    <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-[32px] p-6 sm:p-8 border border-neutral-border shadow-sm space-y-6"
                    >
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-gray-100 pb-4">
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary">Order ID</span>
                                <h3 className="text-lg font-bold text-gray-900">{order.id}</h3>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                    <Clock className="w-3.5 h-3.5" />
                                    {order.status}
                                </span>
                                <button
                                    onClick={() => handleDownloadInvoice(order)}
                                    className="flex items-center gap-1 text-xs font-bold text-gray-600 hover:text-brand-primary transition-colors border border-gray-200 px-3 py-1.5 rounded-xl"
                                >
                                    <Download className="w-3.5 h-3.5" />
                                    Invoice
                                </button>
                            </div>
                        </div>

                        {/* Order Progress Steps */}
                        <div className="grid grid-cols-3 gap-2 py-2 text-center text-[10px] font-bold uppercase tracking-wider">
                            <div className="space-y-1 text-emerald-600">
                                <CheckCircle className="w-5 h-5 mx-auto" />
                                <span>Order Confirmed</span>
                            </div>
                            <div className={`space-y-1 ${order.status === 'In Transit' || order.status === 'Delivered' ? 'text-emerald-600' : 'text-gray-300'}`}>
                                <Truck className="w-5 h-5 mx-auto" />
                                <span>In Transit</span>
                            </div>
                            <div className={`space-y-1 ${order.status === 'Delivered' ? 'text-emerald-600' : 'text-gray-300'}`}>
                                <Package className="w-5 h-5 mx-auto" />
                                <span>Delivered</span>
                            </div>
                        </div>

                        {/* Items */}
                        <div className="space-y-3 pt-2">
                            {order.items.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-4 bg-neutral-warm/30 p-3 rounded-2xl border border-neutral-border">
                                    <img
                                        src={item.product?.image_url}
                                        alt={item.product?.name}
                                        className="w-14 h-14 rounded-xl object-cover shrink-0 border border-gray-100"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-xs text-gray-900 truncate">{item.product?.name}</h4>
                                        <p className="text-[10px] text-gray-400 font-medium">Qty: {item.quantity} • {item.product?.category}</p>
                                    </div>
                                    <span className="font-bold text-xs text-brand-primary">₹{(item.product?.price || 0) * item.quantity}</span>
                                </div>
                            ))}
                        </div>

                        {/* Footer Summary */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-4 border-t border-gray-100 text-xs text-gray-500 gap-2">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-brand-primary shrink-0" />
                                <span>Delivering to <strong className="text-gray-800">{order.shippingAddress.fullName}</strong> ({order.shippingAddress.city}, {order.shippingAddress.state})</span>
                            </div>
                            <span className="text-sm font-bold text-gray-900">Total: <strong className="text-brand-primary text-base">₹{order.total}</strong></span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Orders;
