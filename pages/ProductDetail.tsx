import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Check, ShieldCheck, Zap, ArrowLeft, Lock } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getProduct } = useStore();
  const navigate = useNavigate();
  
  const product = getProduct(id || '');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 text-slate-400">
        Produk tidak ditemukan.
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column: Image & Guarantee */}
          <div className="space-y-6">
            <div className="glass-panel rounded-3xl p-2 relative group overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-tr from-neon-blue/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
               <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-auto rounded-2xl shadow-2xl relative z-10" 
              />
            </div>
            
            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
              <div>
                <h4 className="font-bold text-white">Garansi Akses Selamanya</h4>
                <p className="text-sm text-slate-400">Sekali bayar, akses produk dan update selamanya.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Details & CTA */}
          <div className="lg:pl-8">
            <div className="inline-block px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold mb-4 border border-indigo-500/30">
              INSTANT DOWNLOAD
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {product.name}
            </h1>
            
            <div className="flex items-end gap-3 mb-8">
               <span className="text-4xl font-bold text-neon-blue neon-text">
                 {formatPrice(product.price)}
               </span>
               <span className="text-lg text-slate-500 line-through mb-1">
                 {formatPrice(product.price * 2)}
               </span>
               <span className="text-sm font-medium text-emerald-400 mb-2 px-2 py-0.5 bg-emerald-900/30 rounded border border-emerald-500/20">
                 Hemat 50%
               </span>
            </div>

            <div className="glass-panel rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" /> Apa yang kamu dapatkan:
              </h3>
              <ul className="space-y-3">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-300">
                    <div className="mt-1 w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0 text-indigo-400">
                      <Check className="w-3 h-3" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-slate-400 leading-relaxed mb-8 text-lg">
              {product.description}
            </p>

            <button
              onClick={() => navigate(`/payment/${product.id}`)}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-neon-purple to-neon-pink hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xl shadow-[0_0_30px_rgba(188,19,254,0.4)] hover:shadow-[0_0_40px_rgba(188,19,254,0.6)] transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-3"
            >
              <Lock className="w-5 h-5" /> Beli Sekarang
            </button>
            
            <p className="text-center text-xs text-slate-500 mt-4">
              Pembayaran aman & terverifikasi otomatis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
