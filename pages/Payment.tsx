import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Lock, CreditCard, Wallet, QrCode, Loader2, ChevronRight } from 'lucide-react';

const Payment: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getProduct, showToast } = useStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string>('qris');

  const product = getProduct(id || '');

  useEffect(() => {
    if (!product) navigate('/');
  }, [product, navigate]);

  const handlePay = () => {
    setLoading(true);
    // Simulate API Call
    setTimeout(() => {
      setLoading(false);
      navigate('/success');
    }, 2000);
  };

  if (!product) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
  };

  const methods = [
    { id: 'qris', name: 'QRIS (Gopay/OVO/Dana)', icon: <QrCode className="w-6 h-6" /> },
    { id: 'va', name: 'Bank Transfer (VA)', icon: <CreditCard className="w-6 h-6" /> },
    { id: 'ewallet', name: 'E-Wallet', icon: <Wallet className="w-6 h-6" /> },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 flex items-center justify-center">
      <div className="w-full max-w-lg">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-indigo-500/30 mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Secure Checkout</h1>
          <p className="text-slate-400">Selesaikan pembayaran untuk akses produk.</p>
        </div>

        {/* Order Summary */}
        <div className="glass-panel rounded-2xl p-6 mb-6">
          <h3 className="text-sm uppercase tracking-wider text-slate-500 font-semibold mb-4">Ringkasan Pesanan</h3>
          <div className="flex items-center gap-4 mb-4">
            <img src={product.image} alt={product.name} className="w-16 h-16 rounded-lg object-cover" />
            <div className="flex-1">
              <h4 className="text-white font-medium line-clamp-1">{product.name}</h4>
              <p className="text-sm text-slate-400">Produk Digital</p>
            </div>
            <span className="text-white font-bold">{formatPrice(product.price)}</span>
          </div>
          <div className="border-t border-white/10 pt-4 flex justify-between items-center">
            <span className="text-slate-300">Total Pembayaran</span>
            <span className="text-xl font-bold text-neon-blue">{formatPrice(product.price)}</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-3 mb-8">
          <h3 className="text-sm uppercase tracking-wider text-slate-500 font-semibold mb-2">Metode Pembayaran</h3>
          {methods.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 ${
                selectedMethod === method.id
                  ? 'bg-indigo-600/20 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.3)]'
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              <div className={`p-2 rounded-lg ${selectedMethod === method.id ? 'bg-indigo-500 text-white' : 'bg-slate-700 text-slate-400'}`}>
                {method.icon}
              </div>
              <span className={`font-medium flex-1 text-left ${selectedMethod === method.id ? 'text-white' : 'text-slate-300'}`}>
                {method.name}
              </span>
              {selectedMethod === method.id && <div className="w-3 h-3 rounded-full bg-neon-blue shadow-[0_0_10px_#00f3ff]"></div>}
            </button>
          ))}
        </div>

        {/* Pay Button */}
        <button
          onClick={handlePay}
          disabled={loading}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-neon-blue to-indigo-600 text-white font-bold text-lg shadow-lg hover:shadow-indigo-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> Memproses...
            </>
          ) : (
            <>
              Bayar Sekarang <ChevronRight className="w-5 h-5" />
            </>
          )}
        </button>

      </div>
    </div>
  );
};

export default Payment;
