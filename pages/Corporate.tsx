
import React from 'react';
import { Briefcase, ShieldCheck, Globe, TrendingUp, Handshake, Users, PhoneCall, ChevronRight } from 'lucide-react';

const Corporate: React.FC = () => {
  return (
    <div className="pt-32 pb-20 bg-neutral-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <div>
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-brand-orange/10 rounded-full mb-6">
              <Briefcase size={16} className="text-brand-orange" />
              <span className="text-xs font-bold text-brand-orange uppercase tracking-widest">Enterprise Solutions</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter">
              Powering the <span className="text-brand-orange">Next Era</span> of Business
            </h1>
            <p className="text-xl text-gray-400 mb-10 leading-relaxed">
              We provide tailored fleet management and vehicle acquisition services for multinational corporations, governmental bodies, and high-growth organizations.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-brand-orange text-white px-10 py-5 rounded-full font-black flex items-center justify-center space-x-3 hover:scale-105 transition-all">
                <span>Request a Proposal</span>
                <ChevronRight size={20} />
              </button>
              <button className="glass-dark px-10 py-5 rounded-full font-black border border-white/10 hover:bg-white/5 transition-all">
                Download Brochure
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="glass p-4 rounded-[40px] border border-white/10 rotate-3 hover:rotate-0 transition-transform duration-700">
              <img 
                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1200" 
                className="rounded-[32px] w-full aspect-square object-cover" 
                alt="Corporate Fleet" 
              />
            </div>
            <div className="absolute -bottom-10 -left-10 glass-dark p-8 rounded-3xl border border-brand-orange/30 hidden md:block">
              <div className="flex items-center space-x-4 mb-2">
                <TrendingUp size={24} className="text-brand-orange" />
                <span className="text-2xl font-black">25%</span>
              </div>
              <p className="text-xs text-gray-500 uppercase tracking-widest">Average Fleet Cost Saving</p>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          <div className="glass-dark p-12 rounded-[40px] border border-white/5 hover:border-brand-orange/20 transition-all">
            <ShieldCheck size={48} className="text-brand-orange mb-8" />
            <h3 className="text-2xl font-bold mb-4">Risk Management</h3>
            <p className="text-gray-400">Comprehensive insurance and liability coverage specifically negotiated for corporate environments.</p>
          </div>
          <div className="glass-dark p-12 rounded-[40px] border border-white/5 hover:border-brand-orange/20 transition-all">
            <Globe size={48} className="text-brand-orange mb-8" />
            <h3 className="text-2xl font-bold mb-4">Global Sourcing</h3>
            <p className="text-gray-400">Direct access to manufacturer inventory and priority production slots for bulk acquisitions.</p>
          </div>
          <div className="glass-dark p-12 rounded-[40px] border border-white/5 hover:border-brand-orange/20 transition-all">
            <Handshake size={48} className="text-brand-orange mb-8" />
            <h3 className="text-2xl font-bold mb-4">Dedicated Account Manager</h3>
            <p className="text-gray-400">24/7 priority support for maintenance, upgrades, and fleet logistics.</p>
          </div>
        </div>

        {/* Inquiry Form */}
        <div className="glass rounded-[60px] overflow-hidden border border-white/10 p-10 md:p-20 relative">
          <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
            <Briefcase size={400} />
          </div>
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-black mb-6">Corporate <span className="text-brand-orange">Inquiry</span></h2>
            <p className="text-gray-400 mb-12">Submit your requirements and our executive team will contact you within 2 business hours.</p>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Organization Name</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-brand-orange/50" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Industry</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-brand-orange/50" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Estimated Fleet Size</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-brand-orange/50 appearance-none">
                  <option className="bg-neutral-900">1 - 5 Vehicles</option>
                  <option className="bg-neutral-900">5 - 15 Vehicles</option>
                  <option className="bg-neutral-900">15+ Vehicles</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Message / Requirements</label>
                <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-brand-orange/50 resize-none"></textarea>
              </div>
              <button className="w-full bg-brand-orange text-white py-5 rounded-2xl font-black text-lg hover:scale-[1.02] transition-transform">
                Send Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Corporate;
