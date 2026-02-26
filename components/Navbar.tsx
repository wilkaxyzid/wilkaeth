import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Zap, ShoppingBag, Settings, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClass = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
    isScrolled 
      ? 'bg-slate-900/80 backdrop-blur-lg border-white/10 py-3 shadow-lg' 
      : 'bg-transparent border-transparent py-5'
  }`;

  const isActive = (path: string) => location.pathname === path ? 'text-neon-blue' : 'text-slate-300 hover:text-white';

  return (
    <nav className={navClass}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg group-hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-shadow duration-300">
            <Zap className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold font-sans tracking-tight">
            Wilka<span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">XYZ</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className={`text-sm font-medium transition-colors ${isActive('/')}`}>Home</Link>
          <Link to="/" className={`text-sm font-medium transition-colors hover:text-neon-purple`}>Produk</Link>
          <Link to="/admin" className={`flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all ${isActive('/admin')}`}>
            <Settings className="w-4 h-4" />
            <span className="text-sm">Admin Panel</span>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-4 animate-in slide-in-from-top-5">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-300">Home</Link>
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-300">Produk</Link>
          <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-neon-blue">Admin Panel</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;