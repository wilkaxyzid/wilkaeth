import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStore();

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border backdrop-blur-md min-w-[300px]
            animate-in slide-in-from-right-10 fade-in duration-300
            ${toast.type === 'success' ? 'bg-emerald-900/80 border-emerald-500/30 text-emerald-100' : ''}
            ${toast.type === 'error' ? 'bg-rose-900/80 border-rose-500/30 text-rose-100' : ''}
            ${toast.type === 'info' ? 'bg-blue-900/80 border-blue-500/30 text-blue-100' : ''}
          `}
        >
          {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-emerald-400" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-blue-400" />}
          
          <p className="text-sm font-medium flex-1">{toast.message}</p>
          
          <button 
            onClick={() => removeToast(toast.id)}
            className="opacity-70 hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
