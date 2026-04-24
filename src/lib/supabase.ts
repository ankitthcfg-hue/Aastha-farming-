import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase URL or Anon Key is missing. Please check your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Product {
    id: string;
    name: string;
    category: 'Seeds' | 'Fertilizers' | 'Pesticides' | 'Tools';
    price: number;
    description: string;
    image_url: string;
    stock: number;
    brand?: string;
    instructions?: string;
}

export interface CartItem {
    id: string;
    user_id: string;
    product_id: string;
    quantity: number;
    product?: Product;
}

export interface Order {
    id: string;
    user_id: string;
    total_price: number;
    status: 'pending' | 'completed' | 'failed' | 'delivered';
    created_at: string;
}

export interface OrderItem {
    id: string;
    order_id: string;
    product_id: string;
    quantity: number;
    price: number;
}

export interface Review {
    id: string;
    product_id: string;
    user_id: string;
    rating: number;
    comment: string;
    user_email?: string;
}
