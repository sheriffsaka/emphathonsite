import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { CarFront, Briefcase, LayoutDashboard, Search, Menu, X, Instagram, Twitter, Linkedin } from 'lucide-react';
import Home from './pages/Home.tsx';
import Inventory from './pages/Inventory.tsx';
import Corporate from './pages/Corporate.tsx';
import Admin from './pages/Admin.tsx';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);

  const navLinks = [
    { path: '/', label: 'Experience', icon: <CarFront size={18} /> },
    { path: '/inventory', label: 'Showroom', icon: <Search size={18} /> },
    { path: '/corporate', label: 'Enterprise', icon: <Briefcase size={18} /> },
    { path: '/admin', label: 'Operations', icon: <LayoutDashboard size={18} /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] px-6 py-4">
      <div className="max-w-7xl mx-auto glass rounded-full px-8 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="bg-brand-orange p-1.5 rounded-lg rotate-12 group-hover:rotate-0 transition-transform">
            <CarFront className="text-white" size={24} />
          </div>
          <span className="text-xl font-black tracking-tighter text-white">EMPATHON</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all flex items-center space-x-2 ${
                location.pathname === link.path
                  ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </div>

        <button className="hidden md:block bg-white text-black px-6 py-2 rounded-full text-sm font-black hover:bg-brand-orange hover:text-white transition-all">
          Schedule Walk-in
        </button>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-24 left-6 right-6 glass rounded-3xl p-6 md:hidden animate-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`p-4 rounded-2xl flex items-center space-x-4 font-bold ${
                  location.pathname === link.path ? 'bg-brand-orange text-white' : 'text-gray-400'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
            <button className="w-full bg-white text-black py-4 rounded-2xl font-black">
              Schedule Walk-in
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-neutral-950 pt-32 pb-12 px-6 border-t border-white/5">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="flex items-center space-x-2 mb-8">
            <div className="bg-brand-orange p-1.5 rounded-lg">
              <CarFront className="text-white" size={24} />
            </div>
            <span className="text-2xl font-black tracking-tighter text-white">EMPATHON</span>
          </Link>
          <p className="text-gray-500 max-w-sm mb-8 leading-relaxed">
            The definitive platform for luxury automotive acquisitions in Africa. Providing bespoke solutions for corporate fleets and high-net-worth individuals.
          </p>
          <div className="flex space-x-4">
            {[Instagram, Twitter, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-brand-orange hover:border-brand-orange transition-all">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Explore</h4>
          <ul className="space-y-4 text-gray-500 text-sm">
            <li><Link to="/inventory" className="hover:text-brand-orange transition-colors">Current Showroom</Link></li>
            <li><Link to="/inventory" className="hover:text-brand-orange transition-colors">Pre-order Catalog</Link></li>
            <li><Link to="/corporate" className="hover:text-brand-orange transition-colors">Fleet Management</Link></li>
            <li><Link to="/admin" className="hover:text-brand-orange transition-colors">System Ops</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Contact</h4>
          <ul className="space-y-4 text-gray-500 text-sm">
            <li>Lagos Island, Nigeria</li>
            <li>+234 800 EMPATHON</li>
            <li>concierge@empathon.luxury</li>
            <li className="text-brand-orange font-bold">Open 24/7 for Patrons</li>
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-600 uppercase tracking-widest font-black">
        <p>© 2024 EMPATHON LUXURY AUTOMOTIVE GROUP</p>
        <div className="flex space-x-8 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Global Logistics</a>
        </div>
      </div>
    </div>
  </footer>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-brand-dark flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/corporate" element={<Corporate />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;