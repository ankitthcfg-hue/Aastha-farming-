import { Product } from './lib/supabase';

export const MOCK_PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'Sonalika Wheat Seeds',
        category: 'Seeds',
        price: 1200,
        description: 'High yield wheat seeds suitable for northern Indian climates. Resistance to common pests.',
        image_url: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=400',
        stock: 50,
        brand: 'Sonalika',
        instructions: 'Sow between October and December. Maintain moisture.'
    },
    {
        id: '2',
        name: 'Organic NPK Fertilizer',
        category: 'Fertilizers',
        price: 850,
        description: 'Complete organic fertilizer with Nitrogen, Phosphorus, and Potassium. Boosts crop growth naturally.',
        image_url: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&q=80&w=400',
        stock: 100,
        brand: 'EarthCare',
        instructions: 'Apply 10kg per acre during soil preparation.'
    },
    {
        id: '3',
        name: 'Drip Irrigation System Kit',
        category: 'Tools',
        price: 4500,
        description: 'Efficient water management tool for small to medium fields. Reduces water wastage by 40%.',
        image_url: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=400',
        stock: 20,
        brand: 'AgriTech',
        instructions: 'Refer to manual for installation. Ideal for row crops.'
    },
    {
        id: '4',
        name: 'Neem-based Bio Pesticide',
        category: 'Pesticides',
        price: 600,
        description: 'Safe and effective pest control made from pure neem extracts. Protects against aphids and bollworms.',
        image_url: 'https://images.unsplash.com/photo-1592652426689-5374891b9ef9?auto=format&fit=crop&q=80&w=400',
        stock: 75,
        brand: 'GreenGuard',
        instructions: 'Mix 5ml per litre of water. Spray on foliage.'
    },
    {
        id: '5',
        name: 'Basmati Rice Hybrid Seeds',
        category: 'Seeds',
        price: 1500,
        description: 'Aromatic basmati rice seeds with high resistance to drought.',
        image_url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400',
        stock: 40,
        brand: 'Mahyco'
    },
    {
        id: '6',
        name: 'Urea Fertilizer (Granular)',
        category: 'Fertilizers',
        price: 300,
        description: 'Concentrated nitrogenous fertilizer for rapid greening and growth.',
        image_url: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&q=80&w=400',
        stock: 200,
        brand: 'IFFCO'
    }
];
