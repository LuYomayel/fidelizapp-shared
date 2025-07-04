// Tipos y interfaces compartidos entre frontend y backend
// Solo TypeScript puro - sin dependencias de NestJS

// ======= ENUMS =======
export enum BusinessSize {
  SMALL = '1-5 sucursales',
  MEDIUM = '5-10 sucursales',
  LARGE = '+10 sucursales',
}

export enum BusinessType {
  CAFETERIA = 'Cafeteria',
  RESTAURANT = 'Restaurant',
  PELUQUERIA = 'Peluqueria',
  MANICURA = 'Manicura',
  OTRO = 'Otro',
}

export enum TransactionType {
  ACUMULATION = 'acumulacion',
  EXCHANGE = 'canje',
  REWARD = 'bonificacion',
  PENALTY = 'penalizacion',
}

export enum AdminRole {
  OWNER = 'propietario',
  EMPLOYEE = 'empleado',
}

export enum UserProvider {
  EMAIL = 'email',
  GOOGLE = 'google',
}

// ======= NUEVOS ENUMS PARA SISTEMA DE SELLOS =======
export enum StampType {
  PURCHASE = 'compra',
  VISIT = 'visita',
  REFERRAL = 'referencia',
  BONUS = 'bonus',
  SPECIAL = 'especial',
}

export enum StampStatus {
  ACTIVE = 'activo',
  USED = 'usado',
  EXPIRED = 'expirado',
  CANCELLED = 'cancelado',
}

export enum PurchaseType {
  SMALL = 'pequeña',
  MEDIUM = 'mediana',
  LARGE = 'grande',
  SPECIAL = 'especial',
}

// ======= INTERFACES BÁSICAS =======
export interface IBusiness {
  id?: number | string;
  businessName: string;
  email: string;
  password?: string;
  internalPhone?: string;
  externalPhone?: string;
  size: BusinessSize;
  street?: string;
  neighborhood?: string;
  postalCode?: string;
  province?: string;
  logoPath?: string;
  type: BusinessType;
  instagram?: string;
  tiktok?: string;
  website?: string;
  stampsForReward?: number; // Cantidad de sellos para recompensa
  rewardDescription?: string; // Descripción de la recompensa
  createdAt?: Date;
  updatedAt?: Date;
  active?: boolean;
}

export interface IClient {
  id?: number | string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  googleId?: string;
  profilePicture?: string;
  provider: UserProvider;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// ======= NUEVAS INTERFACES PARA SISTEMA DE SELLOS =======
export interface IStamp {
  id?: number | string;
  businessId: number | string;
  code: string;
  qrCode?: string;
  stampType: StampType;
  purchaseType?: PurchaseType;
  stampValue: number; // Cantidad de sellos que otorga
  description: string;
  status: StampStatus;
  expiresAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  usedAt?: Date;
  usedBy?: number | string; // ID del cliente que lo usó
}

export interface IClientCard {
  id?: number | string;
  clientId: number | string;
  businessId: number | string;
  totalStamps: number;
  availableStamps: number;
  usedStamps: number;
  level: number;
  lastStampDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  client?: IClient;
  business?: IBusiness;
}

export interface IStampRedemption {
  id?: number | string;
  stampId: number | string;
  clientId: number | string;
  clientCardId: number | string;
  redeemedAt: Date;
  stamp?: IStamp;
  client?: IClient;
  clientCard?: IClientCard;
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

export interface Reward {
  id: string;
  name: string;
  description: string;
  requiredPoints: number;
  points: number;
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
  rewardId?: string;
  adminId: string;
}

// ======= INTERFACES PARA DTOs =======
export interface ICreateBusinessDto {
  businessName: string;
  email: string;
  password: string;
  internalPhone?: string;
  externalPhone?: string;
  size: BusinessSize;
  street?: string;
  neighborhood?: string;
  postalCode?: string;
  province?: string;
  type: BusinessType;
  instagram?: string;
  tiktok?: string;
  website?: string;
  logo?: File;
}

export interface IUpdateBusinessDto {
  businessName?: string;
  email?: string;
  password?: string;
  internalPhone?: string;
  externalPhone?: string;
  size?: BusinessSize;
  street?: string;
  neighborhood?: string;
  postalCode?: string;
  province?: string;
  type?: BusinessType;
  instagram?: string;
  tiktok?: string;
  website?: string;
  logo?: File;
}

export interface ILoginBusinessDto {
  email: string;
  password: string;
}

export interface ICreateClientDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface IUpdateClientDto {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
}

export interface ILoginClientDto {
  email: string;
  password: string;
}

// ======= NUEVOS DTOs PARA SISTEMA DE SELLOS =======
export interface ICreateStampDto {
  stampType: StampType;
  purchaseType?: PurchaseType;
  stampValue: number;
  description: string;
  expiresAt?: Date;
}

export interface IRedeemStampDto {
  code: string;
}

export interface IStampSummaryDto {
  totalGenerated: number;
  totalUsed: number;
  totalExpired: number;
  totalActive: number;
  recentStamps: IStamp[];
}

export interface IClientCardSummaryDto {
  totalCards: number;
  activeCards: number;
  totalStampsIssued: number;
  totalStampsRedeemed: number;
  recentRedemptions: IStampRedemption[];
}

// ======= INTERFACES PARA RESPUESTAS API =======
export interface ApiResponse<T = any> {
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

export interface LoginResponse {
  success: boolean;
  data?: {
    user?: any;
    business?: any;
    client?: any;
    token: string;
    refreshToken?: string;
  };
  message?: string;
}

export interface AuthUser {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  businessName?: string;
  type: 'business' | 'client';
  provider: UserProvider;
  profilePicture?: string;
  isActive: boolean;
}

export interface GoogleOAuthUser {
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
  accessToken: string;
  refreshToken?: string;
}

// ======= INTERFACES PARA FORMULARIOS =======
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

export interface ClientRegistrationForm
  extends Omit<ICreateClientDto, 'password'> {
  password?: string;
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

// ======= INTERFACES PARA PAGINACIÓN =======
export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

// ======= INTERFACES PARA FILTROS =======
export interface BusinessFilters extends PaginationParams {
  type?: BusinessType;
  size?: BusinessSize;
  province?: string;
  active?: boolean;
}

export interface ClientFilters extends PaginationParams {
  provider?: UserProvider;
  isActive?: boolean;
}

// ======= NUEVAS INTERFACES PARA FORMULARIOS =======
export interface CreateStampForm {
  stampType: StampType;
  purchaseType?: PurchaseType;
  stampValue: number;
  description: string;
  expiresAt?: Date;
}

export interface RedeemStampForm {
  code: string;
}

export interface StampFilters extends PaginationParams {
  status?: StampStatus;
  stampType?: StampType;
  purchaseType?: PurchaseType;
  dateFrom?: Date;
  dateTo?: Date;
}

export interface ClientCardFilters extends PaginationParams {
  businessId?: number | string;
  minStamps?: number;
  maxStamps?: number;
  level?: number;
}

// ======= LEGACY INTERFACES PARA COMPATIBILIDAD =======
export type Client = IClient; // Mantener compatibilidad
export type CreateClientDto = ICreateClientDto; // Mantener compatibilidad
export type UpdateClientDto = IUpdateClientDto; // Mantener compatibilidad
export type LoginClientDto = ILoginClientDto; // Mantener compatibilidad
export type CreateBusinessDto = ICreateBusinessDto; // Mantener compatibilidad
export type UpdateBusinessDto = IUpdateBusinessDto; // Mantener compatibilidad
export type LoginBusinessDto = ILoginBusinessDto; // Mantener compatibilidad

// Nuevos tipos para el sistema de sellos
export type Stamp = IStamp;
export type ClientCard = IClientCard;
export type StampRedemption = IStampRedemption;
export type CreateStampDto = ICreateStampDto;
export type RedeemStampDto = IRedeemStampDto;
export type StampSummaryDto = IStampSummaryDto;
export type ClientCardSummaryDto = IClientCardSummaryDto;
