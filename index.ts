// Tipos y DTOs compartidos entre frontend y backend

export enum BusinessSize {
  SMALL = "1-5",
  MEDIUM = "5-10",
  LARGE = "10+",
}

export enum BusinessType {
  CAFETERIA = "cafeteria",
  RESTAURANT = "restaurante",
  PELUQUERIA = "peluqueria",
  MANICURA = "manicura",
  OTRO = "otro",
}

export interface Business {
  id?: number | string;
  businessName: string;
  email: string;
  internalPhone: string;
  externalPhone: string;
  size: BusinessSize;
  address?: {
    street: string;
    neighborhood: string;
    postalCode: string;
    province: string;
  };
  logoPath?: string;
  type: BusinessType;
  customType?: string;
  socialMedia?: {
    instagram?: string;
    tiktok?: string;
    website?: string;
  };
  colors?: {
    primary: string;
    secondary: string;
  };
  configuration?: {
    pointsNewClient: number;
  };
  createdAt?: Date;
  active?: boolean;
}

export interface Client {
  id?: number | string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface CreateBusinessDto extends Omit<Business, "id" | "logoPath"> {
  password: string;
}

export type UpdateBusinessDto = Partial<Omit<CreateBusinessDto, "password">>;

export interface CreateClientDto extends Omit<Client, "id"> {}

export type UpdateClientDto = Partial<CreateClientDto>;

// ======= TIPOS ESPECÍFICOS DEL FRONT (no compartidos) =======
// Mantengo los demás tipos que son solo utilizados en el front.

export interface Reward {
  id: string;
  name: string;
  description: string;
  requiredPoints: number;
  image?: string;
  active: boolean;
  createdAt: Date;
  expirationDate?: Date;
  stock?: number;
  businessId: string;
  specialConditions?: string;
}

export interface Transaction {
  id: string;
  clientId: string;
  businessId: string;
  type: TransactionType;
  points: number;
  description: string;
  date: Date;
  rewardId?: string; // Solo para canjes
  adminId: string;
}

export interface Admin {
  id: string;
  name: string;
  email: string;
  businessId: string;
  role: AdminRole;
  createdAt: Date;
  activo: boolean;
}

// ======= ENUMS Y TIPOS =======

export enum TransactionType {
  ACUMULATION = "acumulacion",
  EXCHANGE = "canje",
  REWARD = "bonificacion",
  PENALTY = "penalizacion",
}

export enum AdminRole {
  OWNER = "propietario",
  EMPLOYEE = "empleado",
}

// ======= INTERFACES PARA FORMULARIOS =======

export interface ClientRegistrationForm {
  firstName: string;
  lastName: string;
  email: string;
}

export interface BusinessRegistrationForm {
  businessName: string;
  email: string;
  internalPhone: string;
  externalPhone: string;
  size: BusinessSize;
  address: {
    street: string;
    neighborhood: string;
    postalCode: string;
    province: string;
  };
  logo?: File;
  type: BusinessType;
  customType?: string;
  socialMedia: {
    instagram?: string;
    tiktok?: string;
    website?: string;
  };
}

export interface CreateRewardForm {
  name: string;
  description: string;
  requiredPoints: number;
  image?: File;
  expirationDate?: Date;
  stock?: number;
  specialConditions?: string;
}

export interface AssignPointsForm {
  clientId: string;
  points: number;
  description: string;
}

// ======= INTERFACES PARA RESPUESTAS API =======

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ======= INTERFACES PARA ESTADÍSTICAS =======

export interface BusinessStatistics {
  totalClientes: number;
  clientesActivos: number;
  sellosEmitidos: number;
  recompensasCanjeadas: number;
  retencionClientes: number;
  ventasMes: {
    mes: string;
    ventas: number;
  }[];
  premiosMasCanjeados: {
    premio: string;
    canjes: number;
  }[];
}

// ======= INTERFACES PARA CONTEXTO/ESTADO =======
