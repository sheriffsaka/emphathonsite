import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit, 
  MessageSquare, 
  ShoppingBag, 
  Image as ImageIcon,
  Settings,
  TrendingUp,
  Package,
} from 'lucide-react';
import { api } from '../services/api.ts';
import { Car, Inquiry, PreOrder, HeroMedia } from '../types.ts';

const AdminLoading = () => (
  <div className="space-y-4 animate-in fade-in duration-500">
    <div className="flex justify-between items-center mb-8">
      <div className="w-48 h-10 skeleton rounded-xl" />
      <div className="w-32 h-10 skeleton rounded-xl" />
    </div>
    {Array(4).fill(0).map((_, i) => (
      <div key={i} className="glass p-4 rounded-3xl h-24 skeleton w-full" />
    ))}
  </div>
);

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'inquiries' | 'preorders' | 'media' | 'settings'>('inventory');
  const [cars, setCars] = useState<Car[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [media, setMedia] = useState<HeroMedia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const [c, i, m] = await Promise.all([
        api.cars.getAll(),
        api.inquiries.getAll(),
        api.heroMedia.getAll()
      ]);
      setCars(c);
      setInquiries(i);
      setMedia(m);
      setTimeout(() => setLoading(false), 500);
    };
    load();
  }, [activeTab]);

  const TabButton: React.FC<{ id: typeof activeTab; icon: React.ReactNode; label: string }> = ({ id, icon, label }) => (
    <button 
      onClick={() => { setActiveTab(id); }}
      className={`w-full flex items-center space-x-3 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === id ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/20' : 'hover:bg-white/5 text-gray-400'}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  return (
    <div className="pt-32 pb-20 bg-neutral-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-black mb-2">System <span className="text-brand-orange">Operations</span></h1>
            <p className="text-gray-500">Central management interface for Empathon Luxury.</p>
          </div>
          <div className="glass px-6 py-3 rounded-2xl flex items-center space-x-4">
            <TrendingUp size={16} className="text-green-500" />
            <p className="text-sm font-black">$4.2M Rev</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1 space-y-2">
            <TabButton id="inventory" icon={<Package size={18} />} label="Inventory" />
            <TabButton id="inquiries" icon={<MessageSquare size={18} />} label="Inquiries" />
            <TabButton id="media" icon={<ImageIcon size={18} />} label="Hero Media" />
            <TabButton id="settings" icon={<Settings size={18} />} label="Settings" />
          </div>

          <div className="lg:col-span-3 glass-dark p-8 rounded-[40px] border border-white/10 min-h-[600px]">
            {loading ? <AdminLoading /> : (
              <div className="animate-in fade-in duration-500">
                {activeTab === 'inventory' && (
                  <>
                    <div className="flex justify-between items-center mb-8">
                      <h3 className="text-2xl font-black">Active Inventory ({cars.length})</h3>
                      <button className="bg-brand-orange text-white px-6 py-3 rounded-xl font-bold flex items-center space-x-2"><Plus size={18} /><span>Add New</span></button>
                    </div>
                    <div className="space-y-4">
                      {cars.map(car => (
                        <div key={car.id} className="glass p-4 rounded-3xl border border-white/5 flex items-center justify-between group hover:border-brand-orange/20 transition-all">
                          <div className="flex items-center space-x-6">
                            <img src={car.image} className="w-20 h-20 rounded-2xl object-cover" alt={car.model} />
                            <div>
                              <p className="text-[10px] text-brand-orange font-bold uppercase mb-1">{car.brand}</p>
                              <h4 className="text-lg font-black">{car.model}</h4>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button className="p-3 bg-white/5 rounded-xl"><Edit size={18} /></button>
                            <button className="p-3 bg-red-500/10 text-red-500 rounded-xl"><Trash2 size={18} /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                {activeTab === 'inquiries' && (
                  <>
                    <h3 className="text-2xl font-black mb-8">Customer Requests</h3>
                    <div className="space-y-6">
                      {inquiries.map(i => (
                        <div key={i.id} className="glass p-6 rounded-3xl border border-white/5">
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="font-bold text-lg">{i.name}</h4>
                            <span className="px-4 py-1 rounded-full text-[10px] font-black bg-yellow-500/10 text-yellow-500">{i.status}</span>
                          </div>
                          <p className="text-gray-400 text-sm">{i.message}</p>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                {activeTab === 'media' && (
                  <>
                    <h3 className="text-2xl font-black mb-8">Hero Management</h3>
                    <div className="grid grid-cols-2 gap-6">
                      {media.map(m => (
                        <div key={m.id} className="relative rounded-3xl overflow-hidden aspect-video border border-white/10">
                          <img src={m.url} className="w-full h-full object-cover" alt={m.title} />
                          <div className="absolute bottom-4 left-4 font-bold glass px-3 py-1 rounded-full text-xs">{m.title}</div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;