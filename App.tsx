import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Payment from './pages/Payment';
import Success from './pages/Success';
import Admin from './pages/Admin';
import ToastContainer from './components/Toast';

const App: React.FC = () => {
  return (
    <StoreProvider>
      <Router>
        <div className="bg-slate-950 min-h-screen text-slate-50 font-sans selection:bg-neon-pink selection:text-white">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/payment/:id" element={<Payment />} />
            <Route path="/success" element={<Success />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
          <ToastContainer />
        </div>
      </Router>
    </StoreProvider>
  );
};

export default App;
