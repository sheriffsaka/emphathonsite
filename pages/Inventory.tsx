
import React, { useState, useEffect } from 'react';
import { 
  Filter, 
  Search, 
  ChevronDown, 
  ArrowRight, 
  Activity, 
  Fuel, 
  Settings2,
  Calendar,
  Zap,
  X,
  ShieldCheck,
  Briefcase,
  CheckCircle2
} from 'lucide-react';
import { Car, CarType, Availability } from '../types.ts';
import { api } from '../services/api.ts';

const CarDetailModal: React.FC<{ car: Car; onClose: () => void }> = ({ car, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md" 
        onClick={onClose}
      />
      <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto glass-dark border border-white/10 rounded-[40px] shadow-2xl flex flex-col md:flex-row animate-in zoom-in-95 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all text-white"
        >
          <X size={24} />
        </button>

        {/* Left: Image Section */}
        <div className="md:w-1/2 h-[300px] md:h-auto relative overflow-hidden">
          <img 
            src={car.image} 
            alt={`${car.brand} ${car.model}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 md:hidden" />
          <div className="absolute bottom-6 left-6 md:hidden">
            <p className="text-brand-orange font-bold uppercase tracking-widest text-sm mb-1">{car.brand}</p>
            <h2 className="text-3xl font-black text-white">{car.model}</h2>
          </div>
        </div>

        {/* Right: Details Section */}
        <div className="md:w-1/2 p-8 md:p-12">
          <div className="hidden md:block mb-8">
            <p className="text-brand-orange font-bold uppercase tracking-[0.3em] text-sm mb-2">{car.brand}</p>
            <h2 className="text-5xl font-black text-white leading-tight">{car.model}</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 pb-8 border-b border-white/10">
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Price</span>
              <span className="text-2xl font-black text-white">${car.price.toLocaleString()}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Year</span>
              <span className="text-2xl font-black text-white">{car.year}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Mileage</span>
              <span className="text-2xl font-black text-white">{car.mileage.toLocaleString()} mi</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Condition</span>
              <span className="text-sm font-bold text-brand-orange uppercase pt-2">{car.availability}</span>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-4">Specifications</h4>
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <div className="flex items-center space-x-3 text-gray-300">
                  <Fuel size={18} className="text-brand-orange" />
                  <span className="text-sm font-medium">Fuel: {car.fuelType}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Settings2 size={18} className="text-brand-orange" />
                  <span className="text-sm font-medium">Transmission: {car.transmission}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Briefcase size={18} className="text-brand-orange" />
                  <span className="text-sm font-medium">Type: {car.type}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <ShieldCheck size={18} className="text-brand-orange" />
                  <span className="text-sm font-medium">Certified Pre-Owned</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-4">Description</h4>
              <p className="text-gray-400 leading-relaxed text-sm italic">
                {car.description}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-4">Features & Luxury Package</h4>
              <div className="flex flex-wrap gap-2">
                {car.features.map(f => (
                  <span key={f} className="flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-xs font-bold text-gray-300">
                    <CheckCircle2 size={14} className="text-brand-orange" />
                    <span>{f}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-brand-orange text-white py-5 rounded-[20px] font-black text-lg hover:scale-[1.02] transition-transform shadow-xl shadow-brand-orange/20">
                {car.availability === Availability.PRE_ORDER ? 'Reserve Now' : 'Purchase Acquisition'}
              </button>
              <button className="flex-1 glass text-white py-5 rounded-[20px] font-black text-lg hover:bg-white/10 transition-all border border-white/10">
                Schedule Viewing
              </button>
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
  const [filterType, setFilterType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await api.cars.getAll();
      setCars(data);
      setLoading(false);
    };
    load();
  }, []);

  const brands = ['All', ...Array.from(new Set(cars.map(c => c.brand)))];
  const types = ['All', 'Individual', 'Corporate'];

  const filteredCars = cars.filter(car => {
    const matchesBrand = filterBrand === 'All' || car.brand === filterBrand;
    const matchesType = filterType === 'All' || car.type === filterType;
    const matchesSearch = car.model.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          car.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBrand && matchesType && matchesSearch;
  });

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen bg-neutral-950">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-6xl font-black mb-4">The <span className="text-brand-orange">Archive</span></h1>
          <p className="text-gray-400">Discover your next standard of excellence.</p>
        </div>

        {/* Filters Panel */}
        <div className="glass-dark p-6 rounded-[32px] border border-white/10 mb-12 sticky top-24 z-40">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="text" 
                placeholder="Search models..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-brand-orange/50 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <select 
                className="w-full appearance-none bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-brand-orange/50 transition-all cursor-pointer"
                value={filterBrand}
                onChange={(e) => setFilterBrand(e.target.value)}
              >
                {brands.map(b => <option key={b} value={b} className="bg-neutral-900">{b} Brand</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={18} />
            </div>

            <div className="relative">
              <select 
                className="w-full appearance-none bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-brand-orange/50 transition-all cursor-pointer"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                {types.map(t => <option key={t} value={t} className="bg-neutral-900">{t} Category</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={18} />
            </div>

            <button 
              className="bg-brand-orange text-white rounded-2xl py-4 px-6 font-bold flex items-center justify-center space-x-2 hover:scale-105 transition-all"
              onClick={() => {
                setFilterBrand('All');
                setFilterType('All');
                setSearchQuery('');
              }}
            >
              <Filter size={18} />
              <span>Reset Filters</span>
            </button>
          </div>
        </div>

        {/* Inventory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map(car => (
            <div 
              key={car.id} 
              className="glass-dark group rounded-[40px] overflow-hidden border border-white/5 hover:border-brand-orange/30 transition-all cursor-pointer"
              onClick={() => setSelectedCar(car)}
            >
              <div className="relative h-72 overflow-hidden">
                <img src={car.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={car.model} />
                <div className="absolute top-6 left-6 flex space-x-2">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${car.availability === Availability.IN_STOCK ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-brand-orange/10 text-brand-orange border-brand-orange/20'}`}>
                    {car.availability}
                  </span>
                  {car.year > 2023 && (
                    <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-white border border-white/20">
                      Brand New
                    </span>
                  )}
                </div>
              </div>
              
              <div className="p-10">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-xs text-brand-orange font-bold uppercase tracking-widest mb-1">{car.brand}</p>
                    <h3 className="text-2xl font-black">{car.model}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1">MSRP</p>
                    <p className="text-2xl font-black text-white">${car.price.toLocaleString()}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8 py-6 border-y border-white/5">
                  <div className="flex flex-col items-center">
                    <Calendar size={16} className="text-gray-500 mb-2" />
                    <span className="text-xs font-bold text-gray-300">{car.year}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Zap size={16} className="text-gray-500 mb-2" />
                    <span className="text-xs font-bold text-gray-300">{car.mileage}mi</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Fuel size={16} className="text-gray-500 mb-2" />
                    <span className="text-xs font-bold text-gray-300">{car.fuelType}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {car.features.slice(0, 2).map(f => (
                    <span key={f} className="text-[10px] font-bold text-gray-400 bg-white/5 px-3 py-1 rounded-lg">
                      {f}
                    </span>
                  ))}
                  {car.features.length > 2 && <span className="text-[10px] font-bold text-brand-orange px-2 py-1">+{car.features.length - 2} more</span>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button className="bg-white/10 hover:bg-white/20 text-white font-bold py-4 rounded-2xl transition-all">
                    Inquire
                  </button>
                  <button className="bg-brand-orange text-white font-bold py-4 rounded-2xl hover:scale-105 transition-all shadow-lg shadow-brand-orange/20">
                    {car.availability === Availability.PRE_ORDER ? 'Pre-Order' : 'Acquire'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCars.length === 0 && (
          <div className="text-center py-40 glass rounded-[40px]">
            <Search size={64} className="mx-auto text-gray-700 mb-6" />
            <h3 className="text-3xl font-black mb-2">No Match Found</h3>
            <p className="text-gray-500">Try adjusting your filters or search keywords.</p>
          </div>
        )}
      </div>

      {/* Car Detail Modal */}
      {selectedCar && (
        <CarDetailModal 
          car={selectedCar} 
          onClose={() => setSelectedCar(null)} 
        />
      )}
    </div>
  );
};

export default Inventory;
