import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Star, ShoppingCart } from 'lucide-react';

const Home: React.FC = () => {
  const { products } = useStore();
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
  };

  return (
    <div className="min-h-screen pt-20 pb-20">
      
      {/* Hero Section */}
      <section className="relative px-6 py-20 lg:py-32 overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-[128px] -z-10 animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-blue/20 rounded-full blur-[128px] -z-10 animate-pulse-slow" style={{ animationDelay: '2s' }} />

        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 animate-float">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-xs font-semibold tracking-wide uppercase text-slate-300">Best Seller Digital Products</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
            Banyak yang Bilang Nyari Target Pembeli Produk Digital Itu <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-neon-purple">Susah?</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Kami sediakan modul & produk digital yang siap bantu kamu cepat pecah telur. Jangan buang waktu trial & error.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-lg shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all hover:scale-105 flex items-center gap-2"
            >
              Lihat Produk <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section id="products" className="container mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-white">Katalog <span className="text-neon-blue">Terbaru</span></h2>
          <div className="h-px flex-1 bg-gradient-to-r from-slate-800 to-transparent ml-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="glass-card rounded-2xl overflow-hidden flex flex-col h-full group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
                <div className="absolute bottom-3 left-3">
                  <span className="px-2 py-1 bg-black/60 backdrop-blur rounded text-xs font-medium text-white border border-white/10">
                    Digital Product
                  </span>
                </div>
              </div>
              
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 leading-tight group-hover:text-neon-blue transition-colors">
                  {product.name}
                </h3>
                <p className="text-slate-400 text-sm mb-4 line-clamp-3 flex-1">
                  {product.description}
                </p>
                
                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500">Harga</span>
                    <span className="text-lg font-bold text-neon-blue">{formatPrice(product.price)}</span>
                  </div>
                  <button 
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all hover:scale-105 active:scale-95 group-hover:bg-indigo-600 group-hover:border-indigo-500"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;
