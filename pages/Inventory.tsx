import React, { useState, useEffect } from 'react';
import { 
  Filter, 
  Search, 
  ChevronDown, 
  Fuel, 
  Settings2,
  Calendar,
  Zap,
  X,
  ShieldCheck,
  Briefcase,
  CheckCircle2
} from 'lucide-react';
import { Car, Availability } from '../types.ts';
import { api } from '../services/api.ts';

const InventorySkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {Array(6).fill(0).map((_, i) => (
      <div key={i} className="glass-dark rounded-[40px] overflow-hidden h-[600px]">
        <div className="h-72 skeleton w-full" />
        <div className="p-10 space-y-6">
          <div className="flex justify-between">
            <div className="w-1/2 h-8 skeleton rounded-xl" />
            <div className="w-1/4 h-8 skeleton rounded-xl" />
          </div>
          <div className="grid grid-cols-3 gap-4 py-6 border-y border-white/5">
            <div className="h-10 skeleton rounded-lg" />
            <div className="h-10 skeleton rounded-lg" />
            <div className="h-10 skeleton rounded-lg" />
          </div>
          <div className="w-full h-10 skeleton rounded-xl" />
          <div className="grid grid-cols-2 gap-4">
            <div className="h-14 skeleton rounded-2xl" />
            <div className="h-14 skeleton rounded-2xl" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

const CarDetailModal: React.FC<{ car: Car; onClose: () => void }> = ({ car, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-fade-in">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto glass-dark border border-white/10 rounded-[40px] shadow-2xl flex flex-col md:flex-row animate-slide-up">
        <button onClick={onClose} className="absolute top-6 right-6 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all text-white"><X size={24} /></button>
        <div className="md:w-1/2 h-[300px] md:h-auto relative overflow-hidden">
          <img src={car.image} alt={car.model} className="w-full h-full object-cover" />
        </div>
        <div className="md:w-1/2 p-8 md:p-12">
          <p className="text-brand-orange font-bold uppercase tracking-[0.3em] text-sm mb-2">{car.brand}</p>
          <h2 className="text-5xl font-black text-white leading-tight mb-8">{car.model}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 pb-8 border-b border-white/10">
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Price</span>
              <span className="text-2xl font-black text-white">${car.price.toLocaleString()}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Year</span>
              <span className="text-2xl font-black text-white">{car.year}</span>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {car.features.map(f => (
                <span key={f} className="flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-xs font-bold text-gray-300">
                  <CheckCircle2 size={14} className="text-brand-orange" />
                  <span>{f}</span>
                </span>
              ))}
            </div>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-brand-orange text-white py-5 rounded-[20px] font-black text-lg shadow-xl shadow-brand-orange/20">Purchase Acquisition</button>
            </div>
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
    <div className="pt-32 pb-20 px-6 min-h-screen bg-neutral-950">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 animate-fade-in">
          <h1 className="text-6xl font-black mb-4">The <span className="text-brand-orange">Archive</span></h1>
          <p className="text-gray-400">Discover your next standard of excellence.</p>
        </div>

        <div className="glass-dark p-6 rounded-[32px] border border-white/10 mb-12 sticky top-24 z-40 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="text" placeholder="Search models..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-brand-orange/50 transition-all text-white"
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="relative">
              <select 
                className="w-full appearance-none bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-brand-orange/50 transition-all cursor-pointer text-white"
                value={filterBrand} onChange={(e) => setFilterBrand(e.target.value)}
              >
                <option value="All" className="bg-neutral-900 text-white">All Brands</option>
                {Array.from(new Set(cars.map(c => c.brand))).map(b => <option key={b} value={b} className="bg-neutral-900 text-white">{b}</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            </div>
            <button className="bg-brand-orange text-white rounded-2xl py-4 font-bold" onClick={() => { setFilterBrand('All'); setSearchQuery(''); }}>
              Reset Filters
            </button>
          </div>
        </div>

        {loading ? <InventorySkeleton /> : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map(car => (
              <div key={car.id} className="glass-dark group rounded-[40px] overflow-hidden border border-white/5 hover:border-brand-orange/30 transition-all cursor-pointer animate-fade-in" onClick={() => setSelectedCar(car)}>
                <div className="relative h-72 overflow-hidden">
                  <img src={car.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={car.model} />
                </div>
                <div className="p-10">
                  <p className="text-[10px] text-brand-orange font-bold uppercase tracking-widest mb-1">{car.brand}</p>
                  <h3 className="text-2xl font-black mb-6">{car.model}</h3>
                  <div className="grid grid-cols-3 gap-4 mb-8 py-6 border-y border-white/5">
                    <div className="flex flex-col items-center"><Calendar size={16} className="text-gray-500 mb-2"/><span className="text-xs font-bold">{car.year}</span></div>
                    <div className="flex flex-col items-center"><Zap size={16} className="text-gray-500 mb-2"/><span className="text-xs font-bold">{car.mileage}mi</span></div>
                    <div className="flex flex-col items-center"><Fuel size={16} className="text-gray-500 mb-2"/><span className="text-xs font-bold">{car.fuelType}</span></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-2xl font-black">${car.price.toLocaleString()}</div>
                    <button className="bg-brand-orange text-white px-6 py-3 rounded-xl font-bold">Details</button>
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