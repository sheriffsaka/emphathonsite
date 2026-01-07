
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  CarFront, 
  Menu, 
  X, 
  LayoutDashboard, 
  Briefcase, 
  Search, 
  Calendar, 
  Phone,
  Settings,
  ShieldCheck,
  Star,
  ChevronRight,
  TrendingUp,
  MapPin,
  Clock,
  LogOut
} from 'lucide-react';
import Home from './pages/Home.tsx';
import Inventory from './pages/Inventory.tsx';
import Corporate from './pages/Corporate.tsx';
import Admin from './pages/Admin.tsx';
import { Car } from './types.ts';
import { api } from './services/api.ts';

const Navbar: React.FC<{ isAdmin: boolean }> = ({ isAdmin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Inventory', path: '/inventory', icon: <Search size={18} /> },
    { name: 'Corporate', path: '/corporate', icon: <Briefcase size={18} /> },
    { name: 'Showroom', path: '/', icon: <MapPin size={18} /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3 md:px-10 md:py-6 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto glass-dark rounded-full px-6 py-3 border border-white/10 shadow-2xl">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="bg-white p-1.5 rounded-xl group-hover:scale-105 transition-transform">
            <img src="https://i.ibb.co/VWV8fG8W/emphathonlogotp.png" alt="Empathon Logo" className="h-8 w-auto object-contain" onError={(e) => {
              (e.target as any).style.display = 'none';
              (e.target as any).parentElement.innerHTML += '<div class="bg-brand-orange p-1.5 rounded-lg"><CarFront class="text-white" size={20} /></div>';
            }} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-lg font-black tracking-tighter text-white uppercase">
              EMPATHON
            </span>
            <span className="text-[8px] font-bold text-brand-orange tracking-widest uppercase opacity-80">
              GLOBAL SERVICES
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-brand-orange flex items-center space-x-2 ${location.pathname === link.path ? 'text-brand-orange' : 'text-gray-300'}`}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}
          {isAdmin ? (
            <Link to="/admin" className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm font-bold flex items-center space-x-2 transition-all">
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </Link>
          ) : (
            <button className="bg-brand-orange text-white px-6 py-2 rounded-full text-sm font-bold hover:scale-105 transition-all shadow-lg shadow-brand-orange/20">
              Visit Showroom
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-4 right-4 glass-dark rounded-3xl p-6 pointer-events-auto border border-white/10 animate-in fade-in zoom-in duration-300">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-4 text-lg font-medium p-3 rounded-xl hover:bg-white/10 transition-colors"
              >
                <span className="text-brand-orange">{link.icon}</span>
                <span>{link.name}</span>
              </Link>
            ))}
            <Link 
                to="/admin" 
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-4 text-lg font-medium p-3 rounded-xl hover:bg-white/10 transition-colors"
              >
                <LayoutDashboard className="text-brand-orange" />
                <span>Dashboard</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-950 border-t border-white/5 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center space-x-3 mb-6">
            <img src="https://i.ibb.co/VWV8fG8W/emphathonlogotp.png" alt="Empathon Logo" className="h-10 w-auto brightness-0 invert" />
            <div className="flex flex-col leading-none">
              <span className="text-2xl font-black text-white">EMPATHON</span>
              <span className="text-[10px] font-bold text-brand-orange tracking-[0.3em] uppercase">GLOBAL SERVICES</span>
            </div>
          </div>
          <p className="text-gray-400 max-w-sm mb-8">
            The definitive destination for luxury automotive excellence. Corporate fleet solutions and individual bespoke acquisitions.
          </p>
          <div className="flex space-x-4">
            <div className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-brand-orange hover:text-white cursor-pointer transition-all">
              <span className="font-bold">in</span>
            </div>
            <div className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-brand-orange hover:text-white cursor-pointer transition-all">
              <span className="font-bold">fb</span>
            </div>
            <div className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-brand-orange hover:text-white cursor-pointer transition-all">
              <span className="font-bold">ig</span>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-bold mb-6 text-white uppercase tracking-widest text-xs">Navigation</h4>
          <ul className="space-y-4 text-gray-400">
            <li><Link to="/inventory" className="hover:text-brand-orange transition-colors">Our Inventory</Link></li>
            <li><Link to="/corporate" className="hover:text-brand-orange transition-colors">Corporate Sales</Link></li>
            <li><Link to="/pre-order" className="hover:text-brand-orange transition-colors">Pre-Order</Link></li>
            <li><Link to="/about" className="hover:text-brand-orange transition-colors">About Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-white uppercase tracking-widest text-xs">Contact</h4>
          <ul className="space-y-4 text-gray-400">
            <li className="flex items-center space-x-3"><MapPin size={16} className="text-brand-orange" /> <span>Victoria Island, Lagos</span></li>
            <li className="flex items-center space-x-3"><Phone size={16} className="text-brand-orange" /> <span>+234 800 EMPATHON</span></li>
            <li className="flex items-center space-x-3"><Clock size={16} className="text-brand-orange" /> <span>Mon - Sat: 9AM - 6PM</span></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Empathon Luxury Automotive. All rights reserved.
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [isAdmin] = useState(true); // Mock auth

  useEffect(() => {
    const fetchCars = async () => {
      const data = await api.cars.getAll();
      setCars(data);
    };
    fetchCars();
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar isAdmin={isAdmin} />
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
