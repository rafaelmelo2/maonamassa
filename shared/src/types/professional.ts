export enum ProfessionalStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  PENDING = 'pending'
}

export enum ProfessionalPlan {
  FREE = 'free',
  PREMIUM = 'premium'
}

export interface WorkingHours {
  monday: { start: string; end: string; available: boolean };
  tuesday: { start: string; end: string; available: boolean };
  wednesday: { start: string; end: string; available: boolean };
  thursday: { start: string; end: string; available: boolean };
  friday: { start: string; end: string; available: boolean };
  saturday: { start: string; end: string; available: boolean };
  sunday: { start: string; end: string; available: boolean };
}

export interface ProfessionalDocuments {
  cpf?: string;
  cnpj?: string;
  rg?: string;
  certifications?: string[];
}

export interface ProfessionalMetrics {
  totalJobs: number;
  completedJobs: number;
  cancelledJobs: number;
  averageRating: number;
  totalReviews: number;
  responseTime: number; // horas
  profileViews: number;
}

export interface ProfessionalFinancial {
  totalEarnings: number;
  pendingPayments: number;
  lastPaymentDate?: Date;
  paymentMethod: 'pix' | 'bank_transfer' | 'card';
  pixKey?: string;
  bankAccount?: {
    bank: string;
    agency: string;
    account: string;
    accountType: 'savings' | 'checking';
  };
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  images: string[];
  category: string;
  createdAt: Date;
}

export type VerificationStatus = 'pending' | 'verified' | 'rejected'; 