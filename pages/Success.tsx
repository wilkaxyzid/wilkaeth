import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Download, Home } from 'lucide-react';

const Success: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Confetti / Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-500/20 rounded-full blur-[64px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-blue-500/20 rounded-full blur-[64px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-md w-full text-center relative z-10 glass-panel p-8 rounded-3xl border border-emerald-500/20 shadow-[0_0_50px_rgba(16,185,129,0.1)]">
        
        <div className="w-24 h-24 bg-gradient-to-tr from-emerald-400 to-green-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-[0_0_30px_rgba(52,211,153,0.5)] animate-float">
          <CheckCircle className="w-12 h-12 text-white" />
        </div>

        <h1 className="text-3xl font-bold text-white mb-2">Pembayaran Berhasil 🎉</h1>
        <p className="text-slate-400 mb-8">
          Terima kasih telah berbelanja! Akses produk Anda telah dikirim ke email terdaftar.
        </p>

        <div className="space-y-3">
          <button className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white font-medium transition-all flex items-center justify-center gap-2">
            <Download className="w-4 h-4" /> Download Invoice
          </button>
          
          <button 
            onClick={() => navigate('/')}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" /> Kembali ke Home
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5">
          <p className="text-xs text-slate-500">
            Butuh bantuan? <a href="#" className="text-neon-blue hover:underline">Hubungi Admin</a>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Success;
