import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight,
  Shield,
  Star,
  Zap,
  ChevronRight,
  Gem,
  Award,
  Clock
} from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-brand-dark">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2000" 
          className="w-full h-full object-cover scale-105 brightness-[0.4]"
          alt="Luxury Automotive Background"
        />
        <div className="absolute inset-0 hero-gradient" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl animate-slide-up mt-10">
        <div className="inline-flex items-center space-x-3 px-6 py-2 glass rounded-full mb-8 border-brand-orange/30">
          <Gem size={14} className="text-brand-orange animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">The Pinnacle of Automotive</span>
        </div>
        
        <h1 className="text-5xl md:text-[100px] font-black leading-[0.9] tracking-tighter mb-8 text-white drop-shadow-2xl">
          BEYOND <br />
          <span className="text-brand-orange italic font-serif pr-4">Extraordinary.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          The curated sanctuary for the world's most exclusive automotive icons. 
          We deliver power, prestige, and presence.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
          <Link to="/inventory" className="w-full md:w-auto group bg-brand-orange text-white px-10 py-5 rounded-full font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center space-x-4 hover:scale-105 transition-all shadow-2xl shadow-brand-orange/40">
            <span>Enter Gallery</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="w-full md:w-auto glass border border-white/10 text-white px-10 py-5 rounded-full font-black uppercase tracking-[0.2em] text-xs hover:bg-white/10 transition-all">
            Private Viewings
          </button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 opacity-50 animate-bounce">
        <span className="text-[9px] uppercase tracking-widest text-white">Scroll to Explore</span>
        <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
};

const Home: React.FC = () => {
  return (
    <div className="bg-brand-dark min-h-screen">
      <Hero />
      
      {/* Value Props */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Shield, title: "Vault Certified", desc: "Every asset passes a rigorous 360-degree forensic inspection." },
            { icon: Clock, title: "Rapid Logistics", desc: "Global door-to-door delivery within 72 hours for active stock." },
            { icon: Award, title: "Patron Access", desc: "Exclusive allocation for limited series and pre-production releases." }
          ].map((item, i) => (
            <div key={i} className="group p-10 glass-dark rounded-[32px] border border-white/5 hover:border-brand-orange/30 transition-all hover:-translate-y-2 hover:shadow-2xl">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-orange group-hover:text-white transition-colors">
                <item.icon size={28} />
              </div>
              <h3 className="text-xl font-black mb-4 text-white uppercase tracking-tight">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-brand-dark overflow-hidden relative border-t border-white/5">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-7xl font-black mb-10 tracking-tighter text-white">
            JOIN THE <br />
            <span className="text-brand-orange">FEW.</span>
          </h2>
          <p className="text-xl text-gray-400 mb-12 font-light max-w-2xl mx-auto">
            Experience a level of automotive procurement that transcends commerce. 
            Welcome to the inner circle of Empathon.
          </p>
          <Link to="/inventory" className="inline-flex items-center space-x-4 text-white font-black uppercase tracking-[0.3em] text-sm group hover:text-brand-orange transition-colors">
            <span>Browse the Digital Archive</span>
            <ChevronRight size={20} className="group-hover:translate-x-2 transition-transform text-brand-orange" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;