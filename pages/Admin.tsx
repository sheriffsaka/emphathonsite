import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit, 
  MessageSquare, 
  Image as ImageIcon,
  Settings,
  TrendingUp,
  Package,
} from 'lucide-react';
import { api } from '../services/api.ts';
import { Car, Inquiry, HeroMedia } from '../types.ts';

const AdminLoading = () => (
  <div className="space-y-4 animate-fade-in pt-32 px-6 bg-brand-dark min-h-screen">
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-12">
        <div className="w-48 h-12 bg-white/10 rounded-xl animate-pulse" />
        <div className="w-32 h-12 bg-white/10 rounded-xl animate-pulse" />
      </div>
    </div>
  </div>
);

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'inquiries' | 'media' | 'settings'>('inventory');
  const [cars, setCars] = useState<Car[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [media, setMedia] = useState<HeroMedia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [c, i, m] = await Promise.all([
          api.cars.getAll(),
          api.inquiries.getAll(),
          api.heroMedia.getAll()
        ]);
        setCars(c);
        setInquiries(i);
        setMedia(m);
      } catch (err) {
        console.error("Admin data load failed", err);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };
    load();
  }, [activeTab]);

  const TabButton: React.FC<{ id: typeof activeTab; icon: React.ReactNode; label: string }> = ({ id, icon, label }) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center space-x-3 px-6 py-4 rounded-xl font-bold transition-all text-sm ${activeTab === id ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/20' : 'hover:bg-white/5 text-gray-500 hover:text-brand-orange'}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  if (loading) return <AdminLoading />;

  return (
    <div className="pt-32 pb-32 bg-brand-dark min-h-screen animate-fade-in">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 space-y-4 md:space-y-0">
          <div className="animate-slide-up">
            <h1 className="text-4xl font-black mb-2 text-white">System <span className="text-brand-orange">Ops</span></h1>
            <p className="text-gray-500 text-sm">Empathon Luxury Global Services • v2.4.0</p>
          </div>
          <div className="glass px-8 py-4 rounded-2xl flex items-center space-x-6 animate-fade-in border border-white/5">
            <div className="flex items-center space-x-3">
              <TrendingUp size={18} className="text-green-500" />
              <p className="text-lg font-black text-white">$4.2M</p>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Q4 Revenue</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-2 animate-slide-up">
            <TabButton id="inventory" icon={<Package size={16} />} label="Inventory" />
            <TabButton id="inquiries" icon={<MessageSquare size={16} />} label="Inquiries" />
            <TabButton id="media" icon={<ImageIcon size={16} />} label="Hero Media" />
            <TabButton id="settings" icon={<Settings size={16} />} label="Settings" />
          </div>

          <div className="lg:col-span-3 glass-dark p-8 md:p-10 rounded-[40px] border border-white/5 min-h-[600px] animate-fade-in shadow-2xl">
            {activeTab === 'inventory' && (
              <div className="animate-fade-in">
                <div className="flex justify-between items-center mb-10">
                  <h3 className="text-xl font-black text-white">Active Stock ({cars.length})</h3>
                  <button className="bg-brand-orange text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center space-x-2 hover:bg-brand-orange/90 transition-all">
                    <Plus size={16} />
                    <span>Add Vehicle</span>
                  </button>
                </div>
                <div className="space-y-4">
                  {cars.map(car => (
                    <div key={car.id} className="glass p-4 rounded-2xl border border-white/5 flex items-center justify-between group hover:border-brand-orange/30 transition-all">
                      <div className="flex items-center space-x-6">
                        <img src={car.image} className="w-20 h-20 rounded-xl object-cover" alt={car.model} />
                        <div>
                          <p className="text-[10px] text-brand-orange font-bold uppercase tracking-widest mb-1">{car.brand}</p>
                          <h4 className="text-lg font-bold text-white">{car.model}</h4>
                          <p className="text-xs text-gray-400">${car.price.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <button className="p-3 bg-white/5 rounded-xl hover:bg-white/10 text-white transition-all"><Edit size={16} /></button>
                        <button className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'inquiries' && (
              <div className="animate-fade-in text-center py-20 flex flex-col items-center justify-center h-full">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                  <MessageSquare size={32} className="text-gray-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No New Inquiries</h3>
                <p className="text-gray-500 text-sm">System is monitoring incoming requests.</p>
              </div>
            )}

            {activeTab === 'media' && (
              <div className="animate-fade-in">
                <h3 className="text-xl font-black text-white mb-8">Hero Assets</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {media.map(m => (
                    <div key={m.id} className="relative rounded-3xl overflow-hidden aspect-video group border border-white/10">
                      <img src={m.url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={m.title} />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button className="bg-white text-black p-3 rounded-full hover:bg-brand-orange hover:text-white transition-all"><Edit size={20} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;