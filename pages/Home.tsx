
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  TrendingUp, 
  Calendar, 
  Briefcase, 
  ArrowRight,
  Star,
  Users,
  Trophy,
  Activity,
  ChevronRight
} from 'lucide-react';
import { api } from '../services/api';
import { Car, HeroMedia, Testimonial } from '../types';

const Hero: React.FC = () => {
  const [media, setMedia] = useState<HeroMedia[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const load = async () => {
      const res = await api.heroMedia.getAll();
      setMedia(res.filter(m => m.active));
    };
    load();
  }, []);

  useEffect(() => {
    if (media.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % media.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [media]);

  if (media.length === 0) return <div className="h-[90vh] bg-neutral-900 animate-pulse" />;

  const current = media[currentIndex];

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src={current.url} 
          alt={current.title}
          className="w-full h-full object-cover transition-transform duration-[10s] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      <div className="relative h-full flex flex-col items-center justify-center text-center px-6 pt-20">
        <div className="inline-flex items-center space-x-2 px-4 py-2 glass rounded-full mb-6 animate-bounce">
          <Trophy size={16} className="text-brand-orange" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase">Voted Africa's Top Dealer 2024</span>
        </div>
        <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tight leading-none">
          {current.title.split(' ').map((word, i) => (
            <span key={i} className={i % 2 === 1 ? 'text-brand-orange' : 'text-white'}>{word} </span>
          ))}
        </h1>
        <p className="text-lg md:text-2xl text-gray-300 mb-10 max-w-2xl font-light">
          {current.subtitle}
        </p>
        
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
          <Link to="/inventory" className="group bg-brand-orange text-white px-10 py-5 rounded-full font-bold text-lg flex items-center space-x-3 hover:scale-105 transition-all pulse-brand">
            <span>Explore Inventory</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="glass-dark border border-white/20 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white/10 transition-all">
            Schedule a Walk-in
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex space-x-2">
        {media.map((_, i) => (
          <button 
            key={i} 
            className={`h-1 rounded-full transition-all ${i === currentIndex ? 'w-12 bg-brand-orange' : 'w-3 bg-white/20'}`}
            onClick={() => setCurrentIndex(i)}
          />
        ))}
      </div>
    </section>
  );
};

const BentoGrid: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto py-24 px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-black mb-4">Elite <span className="text-brand-orange">Standards</span></h2>
        <p className="text-gray-400">Exclusivity redefined through every transaction.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-full md:h-[600px]">
        {/* Large Main Feature */}
        <div className="md:col-span-2 md:row-span-2 glass-dark bento-card p-10 flex flex-col justify-end relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity">
            <Activity size={120} className="text-brand-orange" />
          </div>
          <ShieldCheck size={48} className="text-brand-orange mb-6" />
          <h3 className="text-3xl font-bold mb-4">Guaranteed Authenticity</h3>
          <p className="text-gray-400 mb-6">Every vehicle in our showroom undergoes a 300-point rigorous inspection. Only the finest make the cut.</p>
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map(n => (
              <img key={n} src={`https://picsum.photos/40/40?random=${n}`} className="w-10 h-10 rounded-full border-2 border-black" alt="user" />
            ))}
            <div className="w-10 h-10 rounded-full bg-brand-orange flex items-center justify-center text-white text-xs font-bold">+500</div>
          </div>
        </div>

        {/* Corporate Deal */}
        <div className="md:col-span-2 glass bento-card p-8 flex items-center space-x-6">
          <div className="bg-white/10 p-4 rounded-2xl">
            <Briefcase size={32} className="text-brand-orange" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-1">Corporate Fleet Packages</h3>
            <p className="text-sm text-gray-400">Exclusive bulk pricing and priority servicing for organizations.</p>
          </div>
        </div>

        {/* Pre-order */}
        <div className="glass bento-card p-8 group flex flex-col justify-between">
          <Calendar size={32} className="text-white group-hover:text-brand-orange transition-colors mb-4" />
          <div>
            <h3 className="text-xl font-bold mb-1">Pre-order System</h3>
            <p className="text-xs text-gray-400">Reserve your dream vehicle before it touches the soil.</p>
          </div>
        </div>

        {/* Testimonial preview */}
        <div className="glass-dark bg-brand-orange bento-card p-8 flex flex-col justify-between text-white">
          <Star size={32} fill="white" />
          <div>
            <p className="text-sm font-bold italic mb-2">"The best dealership in Lagos. Unmatched luxury."</p>
            <p className="text-xs uppercase tracking-tighter opacity-70">- Daniel K.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturedCars: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    api.cars.getAll().then(setCars);
  }, []);

  return (
    <section className="py-24 bg-neutral-950/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-4">Current <span className="text-brand-orange">Showroom</span></h2>
            <p className="text-gray-400">Limited edition arrivals and high-spec builds.</p>
          </div>
          <Link to="/inventory" className="mt-4 md:mt-0 text-brand-orange font-bold flex items-center space-x-2 group">
            <span>View Full Inventory</span>
            <ChevronRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cars.slice(0, 3).map(car => (
            <div key={car.id} className="glass-dark group rounded-3xl overflow-hidden hover:border-brand-orange/50 transition-all">
              <div className="relative h-64 overflow-hidden">
                <img src={car.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={car.model} />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-brand-orange border border-brand-orange/20">
                  {car.availability}
                </div>
              </div>
              <div className="p-8">
                <p className="text-xs text-brand-orange font-bold uppercase tracking-[0.2em] mb-2">{car.brand}</p>
                <h3 className="text-2xl font-bold mb-4">{car.model}</h3>
                <div className="flex items-center justify-between py-4 border-t border-white/5">
                  <div className="text-sm text-gray-400">Starting at</div>
                  <div className="text-2xl font-black text-white">${car.price.toLocaleString()}</div>
                </div>
                <button className="w-full mt-4 bg-white/5 group-hover:bg-brand-orange group-hover:text-white py-4 rounded-2xl font-bold transition-all flex items-center justify-center space-x-2">
                  <span>View Details</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials: React.FC = () => {
  const [items, setItems] = useState<Testimonial[]>([]);
  
  useEffect(() => {
    api.testimonials.getAll().then(setItems);
  }, []);

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
       <h2 className="text-4xl md:text-6xl font-black mb-16 text-center">Words from our <span className="text-brand-orange">Patrons</span></h2>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {items.map(t => (
           <div key={t.id} className="glass p-10 rounded-[40px] border border-white/5 hover:bg-white/5 transition-all">
             <div className="flex items-center space-x-4 mb-8">
               <img src={t.avatar} className="w-16 h-16 rounded-2xl object-cover border border-white/10" alt={t.name} />
               <div>
                 <h4 className="font-bold text-xl">{t.name}</h4>
                 <p className="text-brand-orange text-sm font-medium">{t.role}</p>
               </div>
               <div className="ml-auto flex">
                 {[...Array(5)].map((_, i) => (
                   <Star key={i} size={16} fill={i < t.rating ? "#D16B1B" : "none"} className={i < t.rating ? "text-brand-orange" : "text-white/20"} />
                 ))}
               </div>
             </div>
             <p className="text-gray-300 text-lg leading-relaxed italic">"{t.content}"</p>
           </div>
         ))}
       </div>
    </section>
  );
};

const Home: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-1000">
      <Hero />
      <BentoGrid />
      <FeaturedCars />
      <Testimonials />
      
      {/* FAQ CTA Section */}
      <section className="py-32 bg-brand-orange/5 flex flex-col items-center text-center px-6">
        <h2 className="text-4xl md:text-6xl font-black mb-8">Ready to Elevate your <span className="text-brand-orange underline underline-offset-8">Status?</span></h2>
        <p className="text-gray-400 max-w-2xl mb-12 text-lg">
          Whether you're looking for a single acquisition or an entire corporate fleet, our specialists are ready to consult with you.
        </p>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
          <Link to="/inventory" className="bg-brand-orange text-white px-12 py-5 rounded-full font-black text-lg hover:scale-105 transition-transform">
            Browse Models
          </Link>
          <button className="glass-dark px-12 py-5 rounded-full font-black text-lg border border-white/10 hover:bg-white/10 transition-all">
            Contact Support
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
