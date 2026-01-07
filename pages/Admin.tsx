
import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit, 
  Search, 
  MessageSquare, 
  ShoppingBag, 
  Image as ImageIcon,
  Settings,
  ChevronRight,
  TrendingUp,
  Package,
  CheckCircle2,
  XCircle,
  Eye
} from 'lucide-react';
import { api } from '../services/api';
import { Car, Inquiry, PreOrder, HeroMedia, CarType, Availability } from '../types';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'inquiries' | 'preorders' | 'media' | 'settings'>('inventory');
  const [cars, setCars] = useState<Car[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [preOrders, setPreOrders] = useState<PreOrder[]>([]);
  const [media, setMedia] = useState<HeroMedia[]>([]);

  useEffect(() => {
    const load = async () => {
      const c = await api.cars.getAll();
      const i = await api.inquiries.getAll();
      const p = await api.preOrders.getAll();
      const m = await api.heroMedia.getAll();
      setCars(c);
      setInquiries(i);
      setPreOrders(p);
      setMedia(m);
    };
    load();
  }, []);

  const TabButton: React.FC<{ id: typeof activeTab; icon: React.ReactNode; label: string }> = ({ id, icon, label }) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`flex items-center space-x-3 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === id ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/20' : 'hover:bg-white/5 text-gray-400'}`}
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
          <div className="flex space-x-2">
            <div className="glass px-6 py-3 rounded-2xl flex items-center space-x-4">
              <div className="bg-green-500/20 p-2 rounded-lg">
                <TrendingUp size={16} className="text-green-500" />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Revenue</p>
                <p className="text-sm font-black">$4.2M</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar Nav */}
          <div className="lg:col-span-1 space-y-2">
            <TabButton id="inventory" icon={<Package size={18} />} label="Inventory" />
            <TabButton id="inquiries" icon={<MessageSquare size={18} />} label="Inquiries" />
            <TabButton id="preorders" icon={<ShoppingBag size={18} />} label="Pre-Orders" />
            <TabButton id="media" icon={<ImageIcon size={18} />} label="Hero Media" />
            <TabButton id="settings" icon={<Settings size={18} />} label="Settings" />
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 glass-dark p-8 rounded-[40px] border border-white/10 min-h-[600px]">
            {activeTab === 'inventory' && (
              <div className="animate-in fade-in duration-500">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-black">Active Inventory ({cars.length})</h3>
                  <button className="bg-brand-orange text-white px-6 py-3 rounded-xl font-bold flex items-center space-x-2 hover:scale-105 transition-all">
                    <Plus size={18} />
                    <span>Add New Vehicle</span>
                  </button>
                </div>
                <div className="space-y-4">
                  {cars.map(car => (
                    <div key={car.id} className="glass p-4 rounded-3xl border border-white/5 flex items-center justify-between group hover:border-brand-orange/20 transition-all">
                      <div className="flex items-center space-x-6">
                        <img src={car.image} className="w-24 h-24 rounded-2xl object-cover" alt={car.model} />
                        <div>
                          <p className="text-xs text-brand-orange font-bold uppercase mb-1">{car.brand}</p>
                          <h4 className="text-lg font-black">{car.model}</h4>
                          <p className="text-sm text-gray-500">{car.year} • {car.type} • ${car.price.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-all">
                          <Edit size={18} />
                        </button>
                        <button className="p-3 bg-red-500/10 hover:bg-red-500/20 rounded-xl text-red-500 transition-all">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'inquiries' && (
              <div className="animate-in fade-in duration-500">
                <h3 className="text-2xl font-black mb-8">Customer Requests</h3>
                <div className="space-y-6">
                  {inquiries.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">No active inquiries.</div>
                  ) : (
                    inquiries.map(i => (
                      <div key={i.id} className="glass p-6 rounded-3xl border border-white/5">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="font-bold text-lg">{i.name}</h4>
                            <p className="text-xs text-gray-500">{i.email} • {i.date}</p>
                          </div>
                          <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase ${i.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-green-500/10 text-green-500'}`}>
                            {i.status}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm mb-6">{i.message}</p>
                        <div className="flex space-x-3">
                          <button className="bg-brand-orange/10 text-brand-orange px-4 py-2 rounded-xl text-xs font-bold hover:bg-brand-orange hover:text-white transition-all">
                            Mark as Contacted
                          </button>
                          <button className="bg-white/5 text-gray-400 px-4 py-2 rounded-xl text-xs font-bold hover:bg-white/10 transition-all">
                            View Thread
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                  {/* Mock Inquiry for visual reference */}
                  <div className="glass p-6 rounded-3xl border border-white/5">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-bold text-lg">Dr. Kunle Adeleke</h4>
                        <p className="text-xs text-gray-500">adeleke@medhub.com • May 24, 2024</p>
                      </div>
                      <span className="px-4 py-1 rounded-full text-[10px] font-black uppercase bg-yellow-500/10 text-yellow-500">
                        Pending
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-6">Interested in the Rolls Royce Phantom. I would like to schedule a walk-in visit this Saturday around 11 AM.</p>
                    <div className="flex space-x-3">
                      <button className="bg-brand-orange/10 text-brand-orange px-4 py-2 rounded-xl text-xs font-bold hover:bg-brand-orange hover:text-white transition-all">
                        Mark as Contacted
                      </button>
                      <button className="bg-white/5 text-gray-400 px-4 py-2 rounded-xl text-xs font-bold hover:bg-white/10 transition-all">
                        View Thread
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'media' && (
              <div className="animate-in fade-in duration-500">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-black">Hero Slider Management</h3>
                  <button className="bg-white/5 px-6 py-3 rounded-xl font-bold border border-white/10 hover:bg-white/10 transition-all">
                    Upload New Media
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  {media.map(m => (
                    <div key={m.id} className="relative group rounded-3xl overflow-hidden aspect-video border border-white/10">
                      <img src={m.url} className="w-full h-full object-cover" alt={m.title} />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center space-y-4">
                        <button className="bg-white text-black px-6 py-2 rounded-full font-bold">Edit Content</button>
                        <button className="text-red-500 font-bold">Delete</button>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                        <span className="text-xs font-bold glass px-3 py-1 rounded-full">{m.title}</span>
                        <div className={`w-3 h-3 rounded-full ${m.active ? 'bg-green-500' : 'bg-gray-500'}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="animate-in fade-in duration-500">
                <h3 className="text-2xl font-black mb-12">Site Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <h4 className="text-xs uppercase font-black text-brand-orange tracking-[0.2em]">Branding</h4>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Primary Brand Color (Orange)</label>
                        <div className="flex items-center space-x-4">
                          <input type="color" defaultValue="#D16B1B" className="w-12 h-12 rounded-lg bg-transparent border-none cursor-pointer" />
                          <input type="text" value="#D16B1B" readOnly className="flex-grow bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none text-gray-400" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Company Logo (White Variant)</label>
                        <div className="border-2 border-dashed border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center text-center">
                          <ImageIcon size={32} className="text-gray-600 mb-4" />
                          <p className="text-xs text-gray-500">Drag and drop or <span className="text-brand-orange cursor-pointer">browse files</span></p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-xs uppercase font-black text-brand-orange tracking-[0.2em]">Contact Details</h4>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Official Phone</label>
                        <input type="text" defaultValue="+234 800 EMPATHON" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Display Currency</label>
                        <select className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none appearance-none">
                          <option className="bg-neutral-900">USD ($)</option>
                          <option className="bg-neutral-900">NGN (₦)</option>
                          <option className="bg-neutral-900">EUR (€)</option>
                        </select>
                      </div>
                    </div>
                    <div className="pt-8">
                      <button className="w-full bg-brand-orange text-white py-4 rounded-xl font-black text-lg shadow-xl shadow-brand-orange/20">
                        Save Global Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'preorders' && (
              <div className="animate-in fade-in duration-500">
                <h3 className="text-2xl font-black mb-8">Pending Reserves</h3>
                <div className="space-y-4">
                  <div className="glass p-6 rounded-3xl border border-white/5 flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div className="w-16 h-16 bg-brand-orange/10 rounded-2xl flex items-center justify-center">
                        <ShoppingBag className="text-brand-orange" />
                      </div>
                      <div>
                        <h4 className="font-bold">Range Rover Autobiography</h4>
                        <p className="text-sm text-gray-500">By Sarah Jenkins • Deposit: $15,000</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-3 bg-green-500/10 text-green-500 rounded-xl hover:bg-green-500/20 transition-all"><CheckCircle2 size={20}/></button>
                      <button className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500/20 transition-all"><XCircle size={20}/></button>
                      <button className="p-3 bg-white/5 text-gray-400 rounded-xl hover:bg-white/10 transition-all"><Eye size={20}/></button>
                    </div>
                  </div>
                  <p className="text-center py-10 text-gray-500 text-sm">End of pre-order history.</p>
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
