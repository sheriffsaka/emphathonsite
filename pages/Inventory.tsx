import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ChevronDown, 
  Fuel, 
  Calendar,
  X,
  CheckCircle2,
  Filter,
  ChevronRight
} from 'lucide-react';
import { Car } from '../types.ts';
import { api } from '../services/api.ts';

const InventorySkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {Array(6).fill(0).map((_, i) => (
      <div key={i} className="glass-dark rounded-[32px] overflow-hidden h-[450px] opacity-40 border border-white/5">
        <div className="h-60 bg-white/5 w-full animate-pulse" />
        <div className="p-8 space-y-4">
          <div className="w-1/3 h-4 bg-white/10 rounded-full animate-pulse" />
          <div className="w-2/3 h-8 bg-white/10 rounded-full animate-pulse" />
        </div>
      </div>
    ))}
  </div>
);

const CarDetailModal: React.FC<{ car: Car; onClose: () => void }> = ({ car, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-8 animate-fade-in">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={onClose} />
      <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto glass-dark border border-white/10 rounded-[40px] shadow-2xl flex flex-col md:flex-row animate-slide-up bg-[#0A0A0A]">
        <button onClick={onClose} className="absolute top-6 right-6 z-20 p-3 bg-black/50 hover:bg-brand-orange rounded-full transition-all text-white backdrop-blur-md"><X size={20} /></button>
        
        <div className="md:w-1/2 h-[300px] md:h-auto relative">
          <img src={car.image} alt={car.model} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:hidden" />
        </div>
        
        <div className="md:w-1/2 p-8 md:p-14 bg-brand-card">
          <div className="flex items-center space-x-3 mb-6">
            <span className="px-3 py-1 bg-brand-orange/20 text-brand-orange text-[10px] font-black uppercase tracking-widest rounded-full">{car.availability}</span>
            <span className="px-3 py-1 bg-white/5 text-gray-400 text-[10px] font-black uppercase tracking-widest rounded-full">{car.type}</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-2">{car.model}</h2>
          <p className="text-brand-orange font-bold uppercase tracking-widest text-xs mb-8">{car.brand}</p>
          
          <div className="grid grid-cols-2 gap-8 mb-10 pb-8 border-b border-white/5">
            <div>
              <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest block mb-1">Price</span>
              <span className="text-3xl font-serif italic text-white">${car.price.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest block mb-1">Year</span>
              <span className="text-3xl font-serif italic text-white">{car.year}</span>
            </div>
          </div>

          <div className="space-y-8">
            <p className="text-gray-400 leading-relaxed font-light text-sm">{car.description}</p>
            
            <div className="flex flex-wrap gap-2">
              {car.features.map(f => (
                <span key={f} className="flex items-center space-x-2 bg-white/5 border border-white/5 px-4 py-2 rounded-full text-[10px] font-bold text-gray-300 uppercase tracking-wide">
                  <CheckCircle2 size={12} className="text-brand-orange" />
                  <span>{f}</span>
                </span>
              ))}
            </div>

            <button className="w-full bg-brand-orange text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-brand-orange/20 hover:bg-brand-orange/90 transition-colors">
              Inquire to Purchase
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Inventory: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterBrand, setFilterBrand] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await api.cars.getAll();
        setCars(data);
      } catch (err) {
        console.error("Inventory load failed", err);
      } finally {
        setTimeout(() => setLoading(false), 800);
      }
    };
    load();
  }, []);

  const filteredCars = cars.filter(car => {
    const matchesBrand = filterBrand === 'All' || car.brand === filterBrand;
    const matchesSearch = car.model.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          car.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBrand && matchesSearch;
  });

  return (
    <div className="pt-32 pb-32 px-4 md:px-6 min-h-screen bg-brand-dark transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center animate-fade-in">
          <span className="text-brand-orange font-black tracking-[0.2em] uppercase text-xs block mb-4">The Collection</span>
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-white">Current <span className="font-serif italic text-brand-orange font-normal">Inventory</span></h1>
        </div>

        {/* Filter Bar */}
        <div className="glass-dark p-4 md:p-6 rounded-[32px] border border-white/5 mb-16 sticky top-28 z-40 animate-fade-in shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-5 relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="text" placeholder="Search models, brands..."
                className="w-full bg-black/20 border border-white/5 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-brand-orange/50 transition-all text-white font-medium placeholder-gray-600 text-sm"
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="md:col-span-4 relative">
              <select 
                className="w-full appearance-none bg-black/20 border border-white/5 rounded-2xl py-4 px-6 outline-none focus:border-brand-orange/50 transition-all cursor-pointer text-white font-medium text-sm"
                value={filterBrand} onChange={(e) => setFilterBrand(e.target.value)}
              >
                <option value="All" className="bg-neutral-900">All Marques</option>
                {Array.from(new Set(cars.map(c => c.brand))).map(b => <option key={b} value={b} className="bg-neutral-900">{b}</option>)}
              </select>
              <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            </div>
            <div className="md:col-span-3">
              <button 
                className="w-full h-full bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-orange hover:text-white transition-colors flex items-center justify-center space-x-2" 
                onClick={() => { setFilterBrand('All'); setSearchQuery(''); }}
              >
                <Filter size={14} />
                <span>Reset Filters</span>
              </button>
            </div>
          </div>
        </div>

        {loading ? <InventorySkeleton /> : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map(car => (
              <div key={car.id} className="glass-dark group rounded-[32px] overflow-hidden border border-white/5 hover:border-brand-orange/40 transition-all cursor-pointer animate-fade-in hover:-translate-y-2 hover:shadow-2xl" onClick={() => setSelectedCar(car)}>
                <div className="relative h-64 overflow-hidden">
                  <img src={car.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={car.model} />
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-widest border border-white/10">
                    {car.availability}
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-[10px] text-brand-orange font-black uppercase tracking-[0.2em] mb-2">{car.brand}</p>
                      <h3 className="text-xl font-black text-white leading-tight">{car.model}</h3>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-6 py-4 border-y border-white/5">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Calendar size={14} />
                      <span className="text-xs font-bold">{car.year}</span>
                    </div>
                    <div className="w-px h-4 bg-white/10" />
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Fuel size={14} />
                      <span className="text-xs font-bold">{car.fuelType}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-2xl font-serif italic text-white">${car.price.toLocaleString()}</div>
                    <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-brand-orange group-hover:text-white transition-colors">
                      <ChevronRight size={16} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {selectedCar && <CarDetailModal car={selectedCar} onClose={() => setSelectedCar(null)} />}
    </div>
  );
};

export default Inventory;