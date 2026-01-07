import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Briefcase, 
  LayoutDashboard, 
  Search, 
  Menu, 
  X, 
  Instagram, 
  Twitter, 
  Linkedin,
  Sun,
  Moon,
  Sparkles,
  Phone,
  ArrowUpRight
} from 'lucide-react';
import Home from './pages/Home.tsx';
import Inventory from './pages/Inventory.tsx';
import Corporate from './pages/Corporate.tsx';
import Admin from './pages/Admin.tsx';

// --- Scroll To Top Helper ---
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

// --- Resilient Logo Component ---
const Logo = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex items-center group cursor-pointer">
      <div className="relative h-10 w-40 md:w-52 bg-white rounded flex items-center justify-center overflow-hidden border border-white/10 shadow-lg transition-all duration-500 group-hover:scale-[1.02]">
        {!imgError ? (
          <img 
            src="logo.png" 
            alt="Empathon" 
            className="h-full w-full object-contain p-2"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center leading-none py-2 px-4">
            <span className="text-black font-black tracking-tighter text-lg md:text-xl font-serif">EMPATHON</span>
            <span className="text-brand-orange text-[7px] md:text-[8px] font-black tracking-[0.3em] uppercase mt-0.5">Luxury Group</span>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Navigation ---
const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  // Scroll effect handler
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Theme handler
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [isDark]);

  const navLinks = [
    { path: '/', label: 'The Experience', icon: <Sparkles size={14} /> },
    { path: '/inventory', label: 'Collection', icon: <Search size={14} /> },
    { path: '/corporate', label: 'Enterprise', icon: <Briefcase size={14} /> },
    { path: '/admin', label: 'Operations', icon: <LayoutDashboard size={14} /> },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-4 md:px-8 ${scrolled ? 'py-4' : 'py-8'}`}>
      <div className={`max-w-7xl mx-auto glass rounded-2xl md:rounded-full px-6 py-4 flex items-center justify-between transition-all duration-500 ${scrolled ? 'shadow-2xl bg-black/40 backdrop-blur-xl' : ''}`}>
        <Link to="/" onClick={() => setIsOpen(false)}>
          <Logo />
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center bg-black/20 dark:bg-white/5 rounded-full p-1 backdrop-blur-md">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center space-x-2 ${
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

        {/* Right Actions */}
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setIsDark(!isDark)}
            className="p-3 rounded-full glass hover:bg-brand-orange hover:text-white transition-all text-gray-400"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <button className="hidden sm:flex bg-white text-black px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-brand-orange hover:text-white transition-all shadow-lg items-center space-x-2 group">
            <Phone size={14} className="group-hover:animate-pulse" />
            <span>Concierge</span>
          </button>

          <button className="lg:hidden text-white p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="absolute top-24 left-4 right-4 glass rounded-[32px] p-6 lg:hidden animate-scale-in shadow-2xl origin-top z-50">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`p-4 rounded-xl flex items-center justify-between font-bold uppercase tracking-widest text-xs transition-all ${
                  location.pathname === link.path ? 'bg-brand-orange text-white' : 'text-gray-400 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center space-x-3">
                  {link.icon}
                  <span>{link.label}</span>
                </div>
                <ArrowUpRight size={14} className="opacity-50" />
              </Link>
            ))}
            <div className="h-px bg-white/10 my-2" />
            <button className="w-full bg-white text-black py-4 rounded-xl font-black uppercase tracking-widest text-xs">
              Call Concierge
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-brand-dark pt-32 pb-12 px-6 border-t border-white/5 relative overflow-hidden">
    {/* Background Decorative Element */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none" />

    <div className="max-w-7xl mx-auto relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="inline-block mb-8"><Logo /></Link>
          <h3 className="text-2xl font-serif italic text-white mb-6">"Excellence is not an act, but a habit."</h3>
          <p className="text-gray-500 max-w-sm mb-10 text-sm leading-relaxed font-light">
            Empathon Global Services is the definitive platform for high-value asset acquisition in Africa. We serve the visionaries shaping our continent's future.
          </p>
          <div className="flex space-x-4">
            {[Instagram, Twitter, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-brand-orange hover:bg-white/5 transition-all">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-white font-black uppercase tracking-[0.2em] text-[10px] mb-8 opacity-50">Curated</h4>
          <ul className="space-y-4 text-gray-400 font-medium text-sm">
            <li><Link to="/inventory" className="hover:text-brand-orange transition-colors flex items-center space-x-2"><span>Inventory</span></Link></li>
            <li><Link to="/inventory" className="hover:text-brand-orange transition-colors">Pre-orders</Link></li>
            <li><Link to="/corporate" className="hover:text-brand-orange transition-colors">Armored Division</Link></li>
            <li><Link to="/admin" className="hover:text-brand-orange transition-colors">Operations</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-black uppercase tracking-[0.2em] text-[10px] mb-8 opacity-50">Contact</h4>
          <ul className="space-y-4 text-gray-400 font-medium text-sm">
            <li>Lagos Island, Nigeria</li>
            <li>+234 800 EMPATHON</li>
            <li>concierge@empathon.luxury</li>
            <li className="text-brand-orange flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
              <span>By Appointment Only</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-600 uppercase tracking-[0.2em] font-bold">
        <p>© 2024 Empathon Global Services.</p>
        <div className="flex space-x-8 mt-6 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Sitemap</a>
        </div>
      </div>
    </div>
  </footer>
);

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-brand-dark transition-colors duration-500">
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