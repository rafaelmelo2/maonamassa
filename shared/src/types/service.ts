export enum ServiceStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  DRAFT = 'draft'
}

export enum ServiceType {
  FIXED_PRICE = 'fixed_price',
  HOURLY = 'hourly',
  QUOTE = 'quote'
}

export interface ServicePricing {
  type: ServiceType;
  basePrice?: number;
  hourlyRate?: number;
  minHours?: number;
  maxHours?: number;
  emergencyRate?: number;
  currency: string;
}

export interface ServiceAvailability {
  monday: { start: string; end: string; available: boolean };
  tuesday: { start: string; end: string; available: boolean };
  wednesday: { start: string; end: string; available: boolean };
  thursday: { start: string; end: string; available: boolean };
  friday: { start: string; end: string; available: boolean };
  saturday: { start: string; end: string; available: boolean };
  sunday: { start: string; end: string; available: boolean };
}

export interface ServiceLocation {
  type: 'home' | 'workshop' | 'both';
  address?: string;
  serviceRadius?: number;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface ServiceRequirements {
  equipment?: string[];
  materials?: string[];
  space?: string;
  access?: string;
  timeEstimate?: {
    min: number;
    max: number;
    unit: 'hours' | 'days';
  };
}

export interface Service {
  id: string;
  professionalId: string;
  title: string;
  description: string;
  category: string;
  subcategory?: string;
  tags: string[];
  images: string[];
  pricing: ServicePricing;
  availability: ServiceAvailability;
  location: ServiceLocation;
  requirements?: ServiceRequirements;
  status: ServiceStatus;
  featured: boolean;
  emergencyService: boolean;
  metrics: {
    views: number;
    requests: number;
    completions: number;
    rating: number;
    reviews: number;
  };
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
} 