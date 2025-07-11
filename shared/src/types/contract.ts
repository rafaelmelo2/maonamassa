export enum ContractStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  DISPUTED = 'disputed'
}

export enum PaymentStatus {
  PENDING = 'pending',
  AUTHORIZED = 'authorized',
  PAID = 'paid',
  REFUNDED = 'refunded',
  FAILED = 'failed'
}

export enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  PIX = 'pix',
  BANK_TRANSFER = 'bank_transfer',
  CASH = 'cash'
}

export interface ContractTerms {
  scope: string;
  deliverables: string[];
  timeline: {
    startDate: Date;
    endDate: Date;
    milestones?: {
      description: string;
      dueDate: Date;
      completed: boolean;
    }[];
  };
  payment: {
    amount: number;
    currency: string;
    method: PaymentMethod;
    installments?: number;
    escrowProtection: boolean;
  };
  cancellation: {
    clientPolicy: string;
    professionalPolicy: string;
    penalties?: {
      client: number;
      professional: number;
    };
  };
  warranty?: {
    duration: number;
    unit: 'days' | 'months' | 'years';
    coverage: string;
  };
}

export interface ContractParticipant {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'client' | 'professional';
  signature?: {
    signed: boolean;
    signedAt?: Date;
    signatureUrl?: string;
  };
}

export interface ContractCommunication {
  id: string;
  from: string;
  to: string;
  message: string;
  type: 'text' | 'image' | 'document' | 'system';
  read: boolean;
  createdAt: Date;
  attachments?: string[];
}

export interface ContractPayment {
  id: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  paidAt?: Date;
  refundedAt?: Date;
  description: string;
}

export interface ContractDispute {
  id: string;
  raisedBy: string;
  reason: string;
  description: string;
  evidence?: string[];
  status: 'open' | 'under_review' | 'resolved' | 'closed';
  resolution?: string;
  resolvedAt?: Date;
  createdAt: Date;
}

export interface Contract {
  id: string;
  serviceId: string;
  clientId: string;
  professionalId: string;
  
  // Participantes
  participants: ContractParticipant[];
  
  // Termos do contrato
  terms: ContractTerms;
  
  // Status
  status: ContractStatus;
  
  // Comunicação
  messages: ContractCommunication[];
  
  // Pagamentos
  payments: ContractPayment[];
  
  // Disputas
  disputes: ContractDispute[];
  
  // Avaliações
  reviews: {
    clientReview?: {
      rating: number;
      comment: string;
      createdAt: Date;
    };
    professionalReview?: {
      rating: number;
      comment: string;
      createdAt: Date;
    };
  };
  
  // Metadados
  createdAt: Date;
  updatedAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  cancelledAt?: Date;
  
  // Documentos
  documents: {
    contract: string;
    invoices: string[];
    receipts: string[];
    photos: string[];
    other: string[];
  };
} 