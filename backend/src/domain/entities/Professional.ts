import { User } from './User';
import { ProfessionalStatus, ProfessionalPlan } from '@shared/types/professional';

export interface Professional {
  id: string;
  userId: string;
  user?: User;
  
  // Informações profissionais
  businessName: string;
  description: string;
  specialties: string[];
  experience: number; // anos
  
  // Documentos
  documents: {
    cpf?: string;
    cnpj?: string;
    rg?: string;
    certifications?: string[];
  };
  
  // Plano e status
  plan: ProfessionalPlan;
  status: ProfessionalStatus;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  
  // Configurações de trabalho
  workingHours: {
    monday: { start: string; end: string; available: boolean };
    tuesday: { start: string; end: string; available: boolean };
    wednesday: { start: string; end: string; available: boolean };
    thursday: { start: string; end: string; available: boolean };
    friday: { start: string; end: string; available: boolean };
    saturday: { start: string; end: string; available: boolean };
    sunday: { start: string; end: string; available: boolean };
  };
  
  serviceRadius: number; // km
  emergencyService: boolean;
  
  // Galeria de trabalhos
  portfolio: {
    id: string;
    title: string;
    description: string;
    images: string[];
    category: string;
    createdAt: Date;
  }[];
  
  // Métricas
  metrics: {
    totalJobs: number;
    completedJobs: number;
    cancelledJobs: number;
    averageRating: number;
    totalReviews: number;
    responseTime: number; // horas
    profileViews: number;
  };
  
  // Financeiro
  financial: {
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
  };
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  lastActiveAt?: Date;
  deletedAt?: Date;
}

export interface CreateProfessionalInput {
  userId: string;
  businessName: string;
  description: string;
  specialties: string[];
  experience: number;
  serviceRadius: number;
  emergencyService: boolean;
  workingHours: Professional['workingHours'];
  documents: Professional['documents'];
}

export interface UpdateProfessionalInput {
  businessName?: string;
  description?: string;
  specialties?: string[];
  experience?: number;
  serviceRadius?: number;
  emergencyService?: boolean;
  workingHours?: Professional['workingHours'];
  documents?: Professional['documents'];
}

export interface ProfessionalSummary {
  id: string;
  userId: string;
  businessName: string;
  description: string;
  specialties: string[];
  plan: ProfessionalPlan;
  status: ProfessionalStatus;
  verificationStatus: Professional['verificationStatus'];
  averageRating: number;
  totalReviews: number;
  serviceRadius: number;
  emergencyService: boolean;
  createdAt: Date;
}

export class ProfessionalEntity {
  constructor(private professional: Professional) {}
  
  get id(): string {
    return this.professional.id;
  }
  
  get userId(): string {
    return this.professional.userId;
  }
  
  get businessName(): string {
    return this.professional.businessName;
  }
  
  get status(): ProfessionalStatus {
    return this.professional.status;
  }
  
  get plan(): ProfessionalPlan {
    return this.professional.plan;
  }
  
  get isActive(): boolean {
    return this.professional.status === ProfessionalStatus.ACTIVE;
  }
  
  get isVerified(): boolean {
    return this.professional.verificationStatus === 'verified';
  }
  
  get isPremium(): boolean {
    return this.professional.plan === ProfessionalPlan.PREMIUM;
  }
  
  get averageRating(): number {
    return this.professional.metrics.averageRating;
  }
  
  get completionRate(): number {
    const total = this.professional.metrics.totalJobs;
    const completed = this.professional.metrics.completedJobs;
    return total > 0 ? (completed / total) * 100 : 0;
  }
  
  public toSummary(): ProfessionalSummary {
    return {
      id: this.professional.id,
      userId: this.professional.userId,
      businessName: this.professional.businessName,
      description: this.professional.description,
      specialties: this.professional.specialties,
      plan: this.professional.plan,
      status: this.professional.status,
      verificationStatus: this.professional.verificationStatus,
      averageRating: this.professional.metrics.averageRating,
      totalReviews: this.professional.metrics.totalReviews,
      serviceRadius: this.professional.serviceRadius,
      emergencyService: this.professional.emergencyService,
      createdAt: this.professional.createdAt
    };
  }
  
  public updateProfile(input: UpdateProfessionalInput): void {
    if (input.businessName !== undefined) {
      this.professional.businessName = input.businessName;
    }
    if (input.description !== undefined) {
      this.professional.description = input.description;
    }
    if (input.specialties !== undefined) {
      this.professional.specialties = input.specialties;
    }
    if (input.experience !== undefined) {
      this.professional.experience = input.experience;
    }
    if (input.serviceRadius !== undefined) {
      this.professional.serviceRadius = input.serviceRadius;
    }
    if (input.emergencyService !== undefined) {
      this.professional.emergencyService = input.emergencyService;
    }
    if (input.workingHours !== undefined) {
      this.professional.workingHours = input.workingHours;
    }
    if (input.documents !== undefined) {
      this.professional.documents = input.documents;
    }
    
    this.professional.updatedAt = new Date();
  }
  
  public activate(): void {
    this.professional.status = ProfessionalStatus.ACTIVE;
    this.professional.updatedAt = new Date();
  }
  
  public deactivate(): void {
    this.professional.status = ProfessionalStatus.INACTIVE;
    this.professional.updatedAt = new Date();
  }
  
  public suspend(): void {
    this.professional.status = ProfessionalStatus.SUSPENDED;
    this.professional.updatedAt = new Date();
  }
  
  public verify(): void {
    this.professional.verificationStatus = 'verified';
    this.professional.updatedAt = new Date();
  }
  
  public upgradeToPremium(): void {
    this.professional.plan = ProfessionalPlan.PREMIUM;
    this.professional.updatedAt = new Date();
  }
  
  public downgradeToFree(): void {
    this.professional.plan = ProfessionalPlan.FREE;
    this.professional.updatedAt = new Date();
  }
  
  public addPortfolioItem(item: Omit<Professional['portfolio'][0], 'id' | 'createdAt'>): void {
    this.professional.portfolio.push({
      ...item,
      id: Math.random().toString(36).substring(2, 15),
      createdAt: new Date()
    });
    this.professional.updatedAt = new Date();
  }
  
  public updateMetrics(metrics: Partial<Professional['metrics']>): void {
    this.professional.metrics = { ...this.professional.metrics, ...metrics };
    this.professional.updatedAt = new Date();
  }
  
  public updateLastActive(): void {
    this.professional.lastActiveAt = new Date();
    this.professional.updatedAt = new Date();
  }
} 