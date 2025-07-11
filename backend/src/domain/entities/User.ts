import { UserRole, UserStatus } from '../../types/user';

export interface UserAddress {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface UserPreferences {
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  privacy: {
    showPhone: boolean;
    showEmail: boolean;
    showAddress: boolean;
  };
  language: string;
  currency: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
  passwordHash: string;
  name: string;
  firstName: string;
  lastName: string;
  phone: string;
  birthDate?: Date;
  gender?: 'male' | 'female' | 'other';
  avatar?: string;
  avatarUrl?: string;
  role: UserRole;
  status: UserStatus;
  emailVerified: boolean;
  emailVerifiedAt?: Date;
  phoneVerified: boolean;
  timezone?: string;
  language?: string;
  
  // Endereço
  address?: UserAddress;
  
  // Preferências
  preferences?: UserPreferences;
  notificationSettings?: any;
  
  // Metadata
  metadata?: any;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
  lastLoginIp?: string;
  deletedAt?: Date;
}

export interface CreateUserInput {
  email: string;
  password: string;
  name: string;
  phone: string;
  role: UserRole;
}

export interface UpdateUserInput {
  name?: string;
  phone?: string;
  avatar?: string;
  address?: User['address'];
  preferences?: User['preferences'];
}

export interface UserSummary {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
  createdAt: Date;
}

export class UserEntity {
  constructor(private user: User) {}
  
  get id(): string {
    return this.user.id;
  }
  
  get email(): string {
    return this.user.email;
  }
  
  get name(): string {
    return this.user.name;
  }
  
  get role(): UserRole {
    return this.user.role;
  }
  
  get status(): UserStatus {
    return this.user.status;
  }
  
  get isActive(): boolean {
    return this.user.status === UserStatus.ACTIVE;
  }
  
  get isVerified(): boolean {
    return this.user.emailVerified && this.user.phoneVerified;
  }
  
  get fullAddress(): string | null {
    if (!this.user.address) return null;
    
    const { street, number, complement, neighborhood, city, state } = this.user.address;
    const complementStr = complement ? `, ${complement}` : '';
    return `${street}, ${number}${complementStr}, ${neighborhood}, ${city} - ${state}`;
  }
  
  public toSummary(): UserSummary {
    return {
      id: this.user.id,
      name: this.user.name,
      email: this.user.email,
      ...(this.user.avatar && { avatar: this.user.avatar }),
      role: this.user.role,
      status: this.user.status,
      createdAt: this.user.createdAt
    };
  }
  
  public toJSON(): Omit<User, 'password'> {
    const { password, ...userWithoutPassword } = this.user;
    return userWithoutPassword;
  }
  
  public updateProfile(input: UpdateUserInput): void {
    if (input.name !== undefined) {
      this.user.name = input.name;
    }
    if (input.phone !== undefined) {
      this.user.phone = input.phone;
    }
    if (input.avatar !== undefined) {
      this.user.avatar = input.avatar;
    }
    if (input.address !== undefined) {
      this.user.address = input.address;
    }
    if (input.preferences !== undefined) {
      this.user.preferences = input.preferences;
    }
    
    this.user.updatedAt = new Date();
  }
  
  public verifyEmail(): void {
    this.user.emailVerified = true;
    this.user.updatedAt = new Date();
  }
  
  public verifyPhone(): void {
    this.user.phoneVerified = true;
    this.user.updatedAt = new Date();
  }
  
  public activate(): void {
    this.user.status = UserStatus.ACTIVE;
    this.user.updatedAt = new Date();
  }
  
  public deactivate(): void {
    this.user.status = UserStatus.INACTIVE;
    this.user.updatedAt = new Date();
  }
  
  public ban(): void {
    this.user.status = UserStatus.BANNED;
    this.user.updatedAt = new Date();
  }
  
  public updateLastLogin(): void {
    this.user.lastLoginAt = new Date();
    this.user.updatedAt = new Date();
  }
} 