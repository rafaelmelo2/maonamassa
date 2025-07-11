// 📍 Endereço
export interface Address {
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

// 📱 Contato
export interface Contact {
  phone: string;
  email: string;
  whatsapp?: string;
}

// 🏷️ Categoria
export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  parentId?: string;
  active: boolean;
}

// 🖼️ Imagem
export interface Image {
  id: string;
  url: string;
  alt: string;
  width?: number;
  height?: number;
  size?: number;
  format?: string;
}

// 📊 Paginação
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// 🔍 Filtros
export interface Filters {
  search?: string;
  category?: string;
  location?: string;
  radius?: number;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  available?: boolean;
  emergency?: boolean;
}

// 📱 Notificação
export interface Notification {
  id: string;
  userId: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
}

// 🎯 Resposta da API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: Pagination;
}

// 🔐 JWT Payload
export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

// 📈 Estatísticas
export interface Stats {
  totalUsers: number;
  totalProfessionals: number;
  totalServices: number;
  totalContracts: number;
  activeContracts: number;
  completedContracts: number;
  averageRating: number;
}

// 🌟 Avaliação
export interface Rating {
  rating: number;
  comment?: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  createdAt: Date;
}

// 📞 Chamada/Contato
export interface Call {
  id: string;
  from: string;
  to: string;
  type: 'voice' | 'video' | 'chat';
  status: 'pending' | 'active' | 'ended' | 'missed';
  startedAt?: Date;
  endedAt?: Date;
  duration?: number;
}

// 📊 Métricas
export interface Metrics {
  views: number;
  clicks: number;
  conversions: number;
  revenue: number;
  rating: number;
  reviews: number;
} 