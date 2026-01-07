
export enum CarType {
  CORPORATE = 'Corporate',
  INDIVIDUAL = 'Individual'
}

export enum Availability {
  IN_STOCK = 'In-Stock',
  PRE_ORDER = 'Pre-Order',
  SOLD = 'Sold'
}

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  image: string;
  mileage: number;
  fuelType: string;
  transmission: string;
  description: string;
  type: CarType;
  availability: Availability;
  features: string[];
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  carId?: string;
  message: string;
  type: 'General' | 'Walk-In' | 'Corporate';
  date: string;
  status: 'Pending' | 'Contacted' | 'Closed';
}

export interface PreOrder {
  id: string;
  carId: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  depositAmount: number;
  status: 'Pending' | 'Approved' | 'Cancelled';
  date: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

export interface HeroMedia {
  id: string;
  type: 'image' | 'video';
  url: string;
  title: string;
  subtitle: string;
  active: boolean;
}
