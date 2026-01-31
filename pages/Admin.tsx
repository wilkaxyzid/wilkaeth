import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Plus, Package, DollarSign, Image as ImageIcon, FileText, Check } from 'lucide-react';

const Admin: React.FC = () => {
  const { addProduct, showToast } = useStore();
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: `https://picsum.photos/id/${Math.floor(Math.random() * 200)}/600/400`,
    featureInput: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.description) {
      showToast('Mohon lengkapi semua data', 'error');
      return;
    }

    const newProduct = {
      id: Date.now().toString(),
      name: formData.name,
      price: parseInt(formData.price),
      description: formData.description,
      image: formData.image,
      features: formData.featureInput.split(',').map(f => f.trim()).filter(f => f.length > 0) || ['Instant Download']
    };

    addProduct(newProduct);
    showToast('Produk berhasil ditambahkan!', 'success');
    
    // Reset form
    setFormData({
      name: '',
      price: '',
      description: '',
      image: `https://picsum.photos/id/${Math.floor(Math.random() * 200)}/600/400`,
      featureInput: '',
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
            <p className="text-slate-400">Kelola produk digital kamu dengan mudah.</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center border border-white/10">
            <Package className="text-neon-purple" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Form Section */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="glass-panel p-8 rounded-2xl space-y-6">
              <h2 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">Tambah Produk Baru</h2>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <Package className="w-4 h-4" /> Nama Produk
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all"
                  placeholder="Contoh: E-Course Master React"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" /> Harga (IDR)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all"
                  placeholder="100000"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <FileText className="w-4 h-4" /> Deskripsi
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all"
                  placeholder="Jelaskan keunggulan produkmu..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <Check className="w-4 h-4" /> Fitur (Pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  name="featureInput"
                  value={formData.featureInput}
                  onChange={handleChange}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all"
                  placeholder="Video HD, Lifetime Access, Grup Support"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-neon-blue to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" /> Publikasikan Produk
                </button>
              </div>
            </form>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-1">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-4">Preview Card</h3>
            <div className="glass-card rounded-2xl overflow-hidden flex flex-col pointer-events-none opacity-80">
              <div className="relative h-40 overflow-hidden bg-slate-800">
                <img 
                  src={formData.image} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                  {formData.name || 'Nama Produk...'}
                </h3>
                <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                  {formData.description || 'Deskripsi produk akan muncul di sini...'}
                </p>
                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500">Harga</span>
                    <p className="text-lg font-bold text-neon-blue">
                       {formData.price ? `Rp ${parseInt(formData.price).toLocaleString('id-ID')}` : 'Rp 0'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 rounded-xl bg-indigo-900/20 border border-indigo-500/20">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                  <ImageIcon className="w-4 h-4" />
                </div>
                <div>
                   <h4 className="text-sm font-bold text-indigo-200">Tips Gambar</h4>
                   <p className="text-xs text-indigo-300/70 mt-1">
                     Gambar di-generate otomatis dari Picsum untuk demo ini.
                   </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Admin;
