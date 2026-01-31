import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ToastMessage, ToastType } from '../types';

interface StoreContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  getProduct: (id: string) => Product | undefined;
  toasts: ToastMessage[];
  showToast: (message: string, type: ToastType) => void;
  removeToast: (id: number) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Initial Mock Data
const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Bundle E-Course Pecah Telur',
    price: 199000,
    description: 'Panduan lengkap memulai bisnis digital dari nol sampai profit pertama. Berisi 20+ video modul dan studi kasus nyata.',
    image: 'https://picsum.photos/id/1/600/400',
    features: ['20+ Video Materi', 'Grup Support Lifetime', 'Studi Kasus Real', 'Template Copywriting']
  },
  {
    id: '2',
    name: 'Template Notion Produktivitas',
    price: 99000,
    description: 'Sistem manajemen waktu dan tugas berbasis Notion. Siap pakai untuk freelancer dan entrepreneur.',
    image: 'https://picsum.photos/id/20/600/400',
    features: ['Dashboard All-in-One', 'CRM Template', 'Finance Tracker', 'Dark Mode Optimized']
  },
  {
    id: '3',
    name: '300+ Aset Grafis Premium',
    price: 149000,
    description: 'Koleksi aset desain grafis high-quality untuk kebutuhan sosial media, website, dan presentasi.',
    image: 'https://picsum.photos/id/26/600/400',
    features: ['PNG Transparent', 'Vector Files', 'Commercial Use', 'Monthly Updates']
  },
  {
    id: '4',
    name: 'Script Email Marketing Kit',
    price: 125000,
    description: 'Kumpulan template email marketing yang terbukti konversi tinggi. Tinggal copy-paste dan sesuaikan.',
    image: 'https://picsum.photos/id/160/600/400',
    features: ['Welcome Series', 'Sales Sequence', 'Nurturing Emails', 'Subject Line Generator']
  }
];

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addProduct = (product: Product) => {
    setProducts(prev => [product, ...prev]);
  };

  const getProduct = (id: string) => {
    return products.find(p => p.id === id);
  };

  const showToast = (message: string, type: ToastType) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <StoreContext.Provider value={{ products, addProduct, getProduct, toasts, showToast, removeToast }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
