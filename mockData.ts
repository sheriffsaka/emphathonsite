
import { Car, CarType, Availability, Testimonial, HeroMedia } from './types.ts';

export const INITIAL_CARS: Car[] = [
  {
    id: '1',
    brand: 'Rolls Royce',
    model: 'Phantom Series II',
    year: 2024,
    price: 450000,
    image: 'https://images.unsplash.com/photo-1631214503951-37510075f7e8?auto=format&fit=crop&q=80&w=1200',
    mileage: 0,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    description: 'The pinnacle of luxury. Unmatched comfort and presence.',
    type: CarType.INDIVIDUAL,
    availability: Availability.IN_STOCK,
    features: ['Starlight Headliner', 'Suicide Doors', 'Whisper Quiet Cabin']
  },
  {
    id: '2',
    brand: 'Mercedes-Benz',
    model: 'G-Wagon G63 AMG',
    year: 2023,
    price: 180000,
    image: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&q=80&w=1200',
    mileage: 1200,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    description: 'Iconic design meets high-performance off-roading capability.',
    type: CarType.CORPORATE,
    availability: Availability.IN_STOCK,
    features: ['V8 Biturbo', '4MATIC', 'Luxury Leather Interior']
  },
  {
    id: '3',
    brand: 'Range Rover',
    model: 'Autobiography LWB',
    year: 2024,
    price: 210000,
    image: 'https://images.unsplash.com/photo-1606148632349-54337270bad1?auto=format&fit=crop&q=80&w=1200',
    mileage: 0,
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    description: 'Sophistication and capability in one stunning package.',
    type: CarType.CORPORATE,
    availability: Availability.PRE_ORDER,
    features: ['Executive Rear Seating', 'PHEV Technology', 'Air Suspension']
  },
  {
    id: '4',
    brand: 'Lamborghini',
    model: 'Urus Performante',
    year: 2024,
    price: 260000,
    image: 'https://images.unsplash.com/photo-1544636331-e268592033c2?auto=format&fit=crop&q=80&w=1200',
    mileage: 0,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    description: 'The super SUV that redefines the segment.',
    type: CarType.INDIVIDUAL,
    availability: Availability.IN_STOCK,
    features: ['Carbon Fiber Parts', 'Sport Exhaust', 'Alcantara Interior']
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Aliko Dangote',
    role: 'CEO, Dangote Group',
    content: 'Empathon provides a level of service that matches the luxury of the vehicles they sell. Their corporate fleet management is world-class.',
    rating: 5,
    avatar: 'https://picsum.photos/100/100?random=1'
  },
  {
    id: '2',
    name: 'Sarah Jenkins',
    role: 'Tech Entrepreneur',
    content: 'Reserved my G-Wagon through their pre-order system. The process was transparent and the delivery was ahead of schedule.',
    rating: 5,
    avatar: 'https://picsum.photos/100/100?random=2'
  }
];

export const INITIAL_HERO_MEDIA: HeroMedia[] = [
  {
    id: '1',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2000',
    title: 'Experience Pure Opulence',
    subtitle: 'Where performance meets prestige.',
    active: true
  },
  {
    id: '2',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=2000',
    title: 'Executive Fleet Solutions',
    subtitle: 'Bespoke corporate packages for discerning organizations.',
    active: true
  }
];
