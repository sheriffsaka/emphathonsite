
import { Car, Inquiry, PreOrder, Testimonial, HeroMedia } from '../types.ts';
import { INITIAL_CARS, INITIAL_TESTIMONIALS, INITIAL_HERO_MEDIA } from '../mockData.ts';

// Simulated DB state using localStorage
const STORAGE_KEYS = {
  CARS: 'emphathon_cars',
  INQUIRIES: 'emphathon_inquiries',
  PRE_ORDERS: 'emphathon_preorders',
  TESTIMONIALS: 'emphathon_testimonials',
  HERO_MEDIA: 'emphathon_hero_media'
};

const getFromStorage = <T,>(key: string, initialValue: T): T => {
  const stored = localStorage.getItem(key);
  if (!stored) {
    localStorage.setItem(key, JSON.stringify(initialValue));
    return initialValue;
  }
  return JSON.parse(stored);
};

const saveToStorage = <T,>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const api = {
  cars: {
    getAll: async (): Promise<Car[]> => getFromStorage(STORAGE_KEYS.CARS, INITIAL_CARS),
    save: async (cars: Car[]): Promise<void> => saveToStorage(STORAGE_KEYS.CARS, cars),
  },
  inquiries: {
    getAll: async (): Promise<Inquiry[]> => getFromStorage(STORAGE_KEYS.INQUIRIES, []),
    add: async (inquiry: Inquiry): Promise<void> => {
      const all = await api.inquiries.getAll();
      saveToStorage(STORAGE_KEYS.INQUIRIES, [inquiry, ...all]);
    },
    update: async (updated: Inquiry): Promise<void> => {
      const all = await api.inquiries.getAll();
      saveToStorage(STORAGE_KEYS.INQUIRIES, all.map(i => i.id === updated.id ? updated : i));
    }
  },
  preOrders: {
    getAll: async (): Promise<PreOrder[]> => getFromStorage(STORAGE_KEYS.PRE_ORDERS, []),
    add: async (order: PreOrder): Promise<void> => {
      const all = await api.preOrders.getAll();
      saveToStorage(STORAGE_KEYS.PRE_ORDERS, [order, ...all]);
    }
  },
  testimonials: {
    getAll: async (): Promise<Testimonial[]> => getFromStorage(STORAGE_KEYS.TESTIMONIALS, INITIAL_TESTIMONIALS),
    save: async (items: Testimonial[]): Promise<void> => saveToStorage(STORAGE_KEYS.TESTIMONIALS, items)
  },
  heroMedia: {
    getAll: async (): Promise<HeroMedia[]> => getFromStorage(STORAGE_KEYS.HERO_MEDIA, INITIAL_HERO_MEDIA),
    save: async (items: HeroMedia[]): Promise<void> => saveToStorage(STORAGE_KEYS.HERO_MEDIA, items)
  }
};
