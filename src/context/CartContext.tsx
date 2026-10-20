import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, CartItem, Product } from '../lib/supabase';

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product, quantity?: number) => Promise<void>;
    removeFromCart: (itemId: string) => Promise<void>;
    updateQuantity: (itemId: string, quantity: number) => Promise<void>;
    clearCart: () => void;
    total: number;
    user: any;
    loginWithGoogle: () => Promise<void>;
    loginWithEmail: (e: string, p: string) => Promise<void>;
    signUpWithEmail: (e: string, p: string) => Promise<void>;
    logout: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });
        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        if (user) {
            fetchCart();
        } else {
            const localCart = localStorage.getItem('guest_cart');
            if (localCart) setCart(JSON.parse(localCart));
        }
    }, [user]);

    const fetchCart = async () => {
        if (!user) return;
        const { data, error } = await supabase
            .from('cart')
            .select('*, product:products(*)')
            .eq('user_id', user.id);
        
        if (!error && data) {
            setCart(data);
        }
    };

    const loginWithGoogle = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.origin,
            },
        });
        if (error) throw error;
    };

    const loginWithEmail = async (email: string, pass: string) => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password: pass,
        });
        if (error) throw error;
    };

    const signUpWithEmail = async (email: string, pass: string) => {
        const { error } = await supabase.auth.signUp({
            email,
            password: pass,
        });
        if (error) throw error;
    };

    const logout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setCart([]);
        localStorage.removeItem('guest_cart');
    };

    const addToCart = async (product: Product, quantity: number = 1) => {
        if (user) {
            const existing = cart.find(item => item.product_id === product.id);
            if (existing) {
                await updateQuantity(existing.id, existing.quantity + quantity);
            } else {
                const { data, error } = await supabase
                    .from('cart')
                    .insert({ user_id: user.id, product_id: product.id, quantity })
                    .select('*, product:products(*)')
                    .single();
                if (!error && data) setCart([...cart, data]);
            }
        } else {
            const newCart = [...cart];
            const existing = newCart.find(item => item.product_id === product.id);
            if (existing) {
                existing.quantity += quantity;
            } else {
                newCart.push({ id: Math.random().toString(), user_id: 'guest', product_id: product.id, quantity, product });
            }
            setCart(newCart);
            localStorage.setItem('guest_cart', JSON.stringify(newCart));
        }
    };

    const removeFromCart = async (itemId: string) => {
        if (user) {
            await supabase.from('cart').delete().eq('id', itemId);
            setCart(cart.filter(item => item.id !== itemId));
        } else {
            const newCart = cart.filter(item => item.id !== itemId);
            setCart(newCart);
            localStorage.setItem('guest_cart', JSON.stringify(newCart));
        }
    };

    const updateQuantity = async (itemId: string, quantity: number) => {
        if (quantity < 1) return;
        if (user) {
            await supabase.from('cart').update({ quantity }).eq('id', itemId);
            setCart(cart.map(item => item.id === itemId ? { ...item, quantity } : item));
        } else {
            const newCart = cart.map(item => item.id === itemId ? { ...item, quantity } : item);
            setCart(newCart);
            localStorage.setItem('guest_cart', JSON.stringify(newCart));
        }
    };

    const clearCart = async () => {
        if (user) {
            await supabase.from('cart').delete().eq('user_id', user.id);
        }
        setCart([]);
        localStorage.removeItem('guest_cart');
    };

    const total = cart.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cart, addToCart, removeFromCart, updateQuantity, clearCart, total,
            user, loginWithGoogle, loginWithEmail, signUpWithEmail, logout
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
};
