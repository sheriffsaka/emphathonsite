import React, { useState, useEffect } from 'react';
import { Briefcase, ShieldCheck, Globe, TrendingUp, Handshake, ChevronRight } from 'lucide-react';

const CorporateSkeleton = () => (
  <div className="pt-32 pb-20 bg-brand-dark min-h-screen">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
        <div className="space-y-8">
          <div className="w-48 h-10 bg-white/10 rounded-full animate-pulse" />
          <div className="w-full h-32 bg-white/10 rounded-3xl animate-pulse" />
        </div>
      </div>
    </div>
  </div>
);

const Corporate: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <CorporateSkeleton />;

  return (
    <div className="pt-40 pb-32 bg-brand-dark min-h-screen animate-fade-in">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <div className="animate-slide-up">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-brand-orange/10 rounded-full mb-8 border border-brand-orange/20">
              <Briefcase size={14} className="text-brand-orange" />
              <span className="text-[10px] font-black text-brand-orange uppercase tracking-[0.2em]">Enterprise Solutions</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter text-white">
              Powering the <br /><span className="text-brand-orange">Visionaries.</span>
            </h1>
            <p className="text-xl text-gray-400 mb-10 leading-relaxed max-w-xl font-light">
              Tailored fleet management and luxury vehicle acquisition services for multinational corporations, government bodies, and high-growth organizations.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-brand-orange text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs flex items-center justify-center space-x-3 hover:scale-105 transition-all shadow-xl shadow-brand-orange/20">
                <span>Request Proposal</span>
                <ChevronRight size={16} />
              </button>
              <button className="glass border border-white/10 px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-white/5 transition-all text-white">
                Download Brochure
              </button>
            </div>
          </div>
          
          <div className="relative animate-fade-in hidden lg:block" style={{ animationDelay: '0.2s' }}>
            <div className="glass p-2 rounded-[40px] border border-white/10 rotate-3 hover:rotate-0 transition-transform duration-700 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1200" 
                className="rounded-[32px] w-full aspect-square object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                alt="Corporate Fleet" 
              />
            </div>
            <div className="absolute -bottom-10 -left-10 glass-dark p-8 rounded-3xl border border-brand-orange/30 shadow-2xl">
              <div className="flex items-center space-x-4 mb-2">
                <TrendingUp size={24} className="text-brand-orange" />
                <span className="text-3xl font-black text-white">25%</span>
              </div>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Fleet Cost Reduction</p>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
          {[
            { icon: ShieldCheck, title: "Risk Management", desc: "Comprehensive insurance and liability coverage specifically negotiated for corporate environments." },
            { icon: Globe, title: "Global Sourcing", desc: "Direct access to manufacturer inventory and priority production slots for bulk acquisitions." },
            { icon: Handshake, title: "Dedicated Partner", desc: "24/7 priority support for maintenance, upgrades, and fleet logistics with a single point of contact." }
          ].map((benefit, i) => (
            <div key={i} className="glass-dark p-10 rounded-[32px] border border-white/5 hover:border-brand-orange/20 transition-all group animate-slide-up hover:-translate-y-1" style={{ animationDelay: `${0.1 * (i + 1)}s` }}>
              <benefit.icon size={32} className="text-brand-orange mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-4 text-white">{benefit.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </div>

        {/* Inquiry Form */}
        <div className="glass-dark rounded-[40px] overflow-hidden border border-white/10 p-8 md:p-20 relative animate-fade-in shadow-2xl">
          <div className="absolute top-0 right-0 p-20 opacity-[0.02] pointer-events-none">
            <Briefcase size={400} />
          </div>
          <div className="max-w-2xl relative z-10">
            <h2 className="text-3xl md:text-5xl font-black mb-6 text-white">Corporate <span className="text-brand-orange">Inquiry</span></h2>
            <p className="text-gray-400 mb-12 text-lg font-light">Submit your requirements. Our executive team will respond within 2 hours.</p>
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Organization</label>
                  <input type="text" className="w-full bg-black/30 border border-white/10 rounded-xl py-4 px-6 outline-none focus:border-brand-orange/50 transition-all text-white placeholder-gray-700" placeholder="Acme Corp" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Industry</label>
                  <input type="text" className="w-full bg-black/30 border border-white/10 rounded-xl py-4 px-6 outline-none focus:border-brand-orange/50 transition-all text-white placeholder-gray-700" placeholder="Technology" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Fleet Requirements</label>
                <select className="w-full bg-black/30 border border-white/10 rounded-xl py-4 px-6 outline-none focus:border-brand-orange/50 appearance-none text-white cursor-pointer">
                  <option className="bg-neutral-900">1 - 5 Vehicles</option>
                  <option className="bg-neutral-900">5 - 15 Vehicles</option>
                  <option className="bg-neutral-900">15+ Vehicles</option>
                </select>
              </div>
              <button className="w-full bg-brand-orange text-white py-5 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-brand-orange/90 transition-all shadow-xl">
                Submit Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Corporate;