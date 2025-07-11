import { User } from '../entities/User';
import { UserRole, UserStatus } from '../../types/user';

// 🎯 Interface para o repositório de usuários
export interface IUserRepository {
  // 🔨 Operações CRUD básicas
  create(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(filters?: { 
    role?: UserRole; 
    status?: UserStatus; 
    page?: number; 
    limit?: number 
  }): Promise<{ users: User[]; total: number }>;
  update(id: string, userData: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>): Promise<User | null>;
  delete(id: string): Promise<boolean>;
  
  // 🔐 Operações de autenticação
  updateLastLogin(id: string, ip?: string): Promise<void>;
  findByEmailVerificationToken(token: string): Promise<User | null>;
  findByPasswordResetToken(token: string): Promise<User | null>;
} 