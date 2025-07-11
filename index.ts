// Tipos y interfaces compartidos entre frontend y backend
// Solo TypeScript puro - sin dependencias de NestJS

// ======= ENUMS =======
export enum BusinessSize {
  SMALL = "1-5 sucursales",
  MEDIUM = "5-10 sucursales",
  LARGE = "+10 sucursales",
}

export enum BusinessType {
  CAFETERIA = "Cafeteria",
  RESTAURANT = "Restaurant",
  PELUQUERIA = "Peluqueria",
  MANICURA = "Manicura",
  OTRO = "Otro",
}

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

export enum UserProvider {
  EMAIL = "email",
  GOOGLE = "google",
}

// ======= NUEVOS ENUMS PARA SISTEMA DE SELLOS =======
export enum StampType {
  PURCHASE = "compra",
  VISIT = "visita",
  REFERRAL = "referencia",
  BONUS = "bonus",
  SPECIAL = "especial",
}

export enum StampStatus {
  ACTIVE = "activo",
  USED = "usado",
  EXPIRED = "expirado",
  CANCELLED = "cancelado",
}

export enum PurchaseType {
  SMALL = "pequeña",
  MEDIUM = "mediana",
  LARGE = "grande",
  SPECIAL = "especial",
}

// ======= ENUMS PARA SISTEMA DE RECOMPENSAS =======
export enum RedemptionStatus {
  PENDING = "pending",
  DELIVERED = "delivered",
  EXPIRED = "expired",
  CANCELLED = "cancelled",
}

// ======= INTERFACES PARA USUARIOS/AUTENTICACIÓN =======
// Interfaces para tipificar req.user en diferentes contextos

export interface BaseUser {
  userId: number;
  username: string;
  type: "client" | "business";
}

export interface ClientUser extends BaseUser {
  type: "client";
  clientId: number;

  email: string;
  emailVerified: boolean;
  provider: "email" | "google";
  firstName?: string;
  lastName?: string;
  picture?: string;
}

export interface BusinessUser extends BaseUser {
  type: "business";
  businessId: number;
  email: string;
  emailVerified: boolean;
  provider: "email" | "google";
  picture?: string;
}

// Union type para req.user
export type AuthenticatedUser = ClientUser | BusinessUser;

// Interfaces para el payload del JWT
export interface BaseJwtPayload {
  username: string;
  sub: number;
  type: "client" | "business";
}

export interface ClientJwtPayload extends BaseJwtPayload {
  type: "client";
  email: string;
  provider: "email" | "google";
  emailVerified: boolean;
}

export interface BusinessJwtPayload extends BaseJwtPayload {
  type: "business";
  email: string;
  provider: "email" | "google";
  emailVerified: boolean;
}

export type JwtPayload = ClientJwtPayload | BusinessJwtPayload;

// Type guards para verificar el tipo de usuario
export function isClientUser(user: AuthenticatedUser): user is ClientUser {
  return user.type === "client";
}

export function isBusinessUser(user: AuthenticatedUser): user is BusinessUser {
  return user.type === "business";
}

// Interfaces para request con usuario autenticado
export interface AuthenticatedRequest {
  user: AuthenticatedUser;
}

export interface ClientRequest {
  user: ClientUser;
}

export interface BusinessRequest {
  user: BusinessUser;
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
  customType?: string;
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
  business?: IBusiness; // Relación con el negocio
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
  redemptions?: IStampRedemption[];
}

export interface IBusinessClient {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
  totalStamps: number;
  availableStamps: number;
  usedStamps: number;
  level: number;
  lastStampDate: Date;
  totalRedemptions: number;
  createdAt: Date;
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

export interface IReward {
  id: number;
  businessId: number;
  name: string;
  description: string;
  requiredStamps: number; // Cantidad de sellos necesarios para canjear
  stampsCost: number; // Cantidad de sellos que cuesta la recompensa
  image?: string;
  active: boolean;
  expirationDate?: Date;
  stock?: number; // Stock disponible (-1 = ilimitado)
  specialConditions?: string;
  createdAt: Date;
  updatedAt: Date;
  // Relaciones
  business: IBusiness;
  redemptions: IRewardRedemption[];
}

export interface IRewardRedemption {
  id: number;
  rewardId: number;
  clientId: number;
  clientCardId: number;
  businessId: number;
  stampsSpent: number; // Cantidad de sellos gastados
  stampsBefore: number; // Sellos antes del canje
  stampsAfter: number; // Sellos después del canje
  redemptionCode: string; // Código único para mostrar al negocio
  status: RedemptionStatus; // Estado del reclamo
  expiresAt?: Date; // Fecha de expiración del código
  deliveredAt?: Date; // Cuándo se entregó la recompensa física
  deliveredBy?: string; // Quién entregó la recompensa
  notes?: string; // Notas adicionales del canje
  redeemedAt: Date;
  updatedAt: Date;
  // Relaciones
  reward: IReward;
  client: IClient;
  clientCard: IClientCard;
  business?: IBusiness; // Información del negocio
}

// ======= NUEVAS INTERFACES PARA RECLAMOS =======
export interface IRedemptionTicket {
  id: number;
  redemptionCode: string;
  clientName: string;
  clientEmail: string;
  rewardName: string;
  rewardDescription: string;
  stampsSpent: number;
  redeemedAt: Date;
  expiresAt?: Date;
  status: RedemptionStatus;
  businessName: string;
  businessLogo?: string;
}

export interface IRedemptionDashboard {
  totalPending: number;
  totalDelivered: number;
  totalExpired: number;
  pendingRedemptions: IRewardRedemption[];
  recentDeliveries: IRewardRedemption[];
}

export interface IDeliverRedemptionDto {
  redemptionId: number;
  deliveredBy: string;
  notes?: string;
}

export interface IRedemptionFilters {
  status?: RedemptionStatus;
  dateFrom?: Date;
  dateTo?: Date;
  clientId?: number;
  rewardId?: number;
  page?: number;
  limit?: number;
}

export interface IRewardStatistics {
  totalRewards: number;
  totalRedemptions: number;
  pendingRedemptions: number;
  mostRedeemedReward?: {
    name: string;
    redemptions: number;
  };
}

export interface IDashboard {
  totalStamps: number;
  activeClients: number;
  rewardsExchanged: number;
  clientRetention: number;
  recentClients: IClientCard[];
  // Nuevas métricas para recompensas
  totalRedemptions: number;
  pendingRedemptions: number;
  recentRedemptions: IRewardRedemption[];
  // Porcentajes de crecimiento vs mes anterior
  stampsGrowth: number;
  clientsGrowth: number;
  rewardsGrowth: number;
  retentionGrowth: number;
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
  customType?: string;
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
  customType?: string;
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
  type: "business" | "client";
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
  extends Omit<ICreateClientDto, "password"> {
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
  sortOrder?: "ASC" | "DESC";
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

// ======= NUEVAS INTERFACES PARA CONFIGURACIÓN MODULAR =======
export interface IStampConfig {
  id?: number | string;
  businessId: number | string;
  name: string; // Nombre del tipo de código
  description?: string; // Descripción del tipo
  stampType: StampType;
  purchaseType?: PurchaseType;
  stampValue: number; // Cantidad de sellos que otorga
  minPurchaseAmount?: number; // Monto mínimo de compra
  maxPurchaseAmount?: number; // Monto máximo de compra
  isActive: boolean;
  isQuickAction: boolean; // Si aparece en acciones rápidas
  buttonColor?: string; // Color del botón
  buttonText?: string; // Texto del botón
  iconName?: string; // Nombre del icono
  sortOrder: number; // Orden de aparición
  createdAt?: Date;
  updatedAt?: Date;
  business?: IBusiness;
}

export interface IStampRule {
  id?: number | string;
  businessId: number | string;
  name: string; // Nombre de la regla
  description?: string; // Descripción de la regla
  minAmount: number; // Monto mínimo
  maxAmount?: number; // Monto máximo (null = sin límite)
  stampsAwarded: number; // Sellos otorgados
  isActive: boolean;
  sortOrder: number;
  createdAt?: Date;
  updatedAt?: Date;
  business?: IBusiness;
}

// ======= DTOs PARA CONFIGURACIÓN =======
export interface ICreateStampConfigDto {
  name: string;
  description?: string;
  stampType: StampType;
  purchaseType?: PurchaseType;
  stampValue: number;
  minPurchaseAmount?: number;
  maxPurchaseAmount?: number;
  isActive?: boolean;
  isQuickAction?: boolean;
  buttonColor?: string;
  buttonText?: string;
  iconName?: string;
  sortOrder?: number;
}

export interface IUpdateStampConfigDto {
  name?: string;
  description?: string;
  stampType?: StampType;
  purchaseType?: PurchaseType;
  stampValue?: number;
  minPurchaseAmount?: number;
  maxPurchaseAmount?: number;
  isActive?: boolean;
  isQuickAction?: boolean;
  buttonColor?: string;
  buttonText?: string;
  iconName?: string;
  sortOrder?: number;
}

export interface ICreateStampRuleDto {
  name: string;
  description?: string;
  minAmount: number;
  maxAmount?: number;
  stampsAwarded: number;
  isActive?: boolean;
  sortOrder?: number;
}

export interface IUpdateStampRuleDto {
  name?: string;
  description?: string;
  minAmount?: number;
  maxAmount?: number;
  stampsAwarded?: number;
  isActive?: boolean;
  sortOrder?: number;
}

// ======= INTERFACES PARA GENERAR CÓDIGOS CON CONFIGURACIÓN =======
export interface IGenerateStampFromConfigDto {
  configId: number;
  description: string;
  purchaseAmount?: number; // Para validar reglas de monto
  expiresAt?: Date;
}

export interface IQuickStampGenerationDto {
  configId: number;
  purchaseAmount?: number;
}

// ======= INTERFACES PARA PERFILES DE USUARIO =======
export interface IBusinessProfile {
  id: number;
  businessName: string;
  email: string;
  internalPhone?: string;
  externalPhone?: string;
  size: BusinessSize;
  street?: string;
  neighborhood?: string;
  postalCode?: string;
  province?: string;
  logoPath?: string;
  type: BusinessType;
  customType?: string;
  instagram?: string;
  tiktok?: string;
  website?: string;
  stampsForReward: number;
  rewardDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IClientProfile {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  provider: UserProvider;
  emailVerified: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  // Estadísticas del cliente
  totalStamps?: number;
  totalRedemptions?: number;
  favoriteBusinesses?: string[];
  memberSince?: Date;
  // Información detallada del perfil
  statistics?: {
    totalStamps: number;
    totalRedemptions: number;
    activeDays: number;
    totalBusinesses: number;
    stampsByBusiness: Array<{
      businessName: string;
      businessId: number;
      totalStamps: number;
      availableStamps: number;
      usedStamps: number;
      level: number;
      lastStampDate?: Date;
    }>;
    rewardsByBusiness: Array<{
      businessName: string;
      businessId: number;
      totalRewards: number;
      lastRewardDate?: Date;
    }>;
  };
  // Tarjetas de cliente por negocio
  clientCards?: Array<{
    id: number;
    businessId: number;
    businessName: string;
    businessLogo?: string;
    businessType: string;
    totalStamps: number;
    availableStamps: number;
    usedStamps: number;
    level: number;
    lastStampDate?: Date;
    stampsForReward: number;
    rewardDescription?: string;
  }>;
  // Recompensas canjeadas recientemente
  recentRewards?: Array<{
    id: number;
    rewardName: string;
    businessName: string;
    businessLogo?: string;
    stampsSpent: number;
    redemptionCode: string;
    status: string;
    redeemedAt: Date;
    expiresAt?: Date;
  }>;
}

// ======= DTOs PARA ACTUALIZACIÓN DE PERFILES =======
export interface IUpdateBusinessProfileDto {
  businessName?: string;
  email?: string;
  internalPhone?: string;
  externalPhone?: string;
  size?: BusinessSize;
  street?: string;
  neighborhood?: string;
  postalCode?: string;
  province?: string;
  type?: BusinessType;
  customType?: string;
  instagram?: string;
  tiktok?: string;
  website?: string;
  stampsForReward?: number;
  rewardDescription?: string;
}

export interface IUpdateClientProfileDto {
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string; // Para cambio de contraseña
  currentPassword?: string; // Para validar cambio de contraseña
}

export interface IChangePasswordDto {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface IChangePasswordWithoutCurrentDto {
  newPassword: string;
  confirmPassword: string;
}

// ======= INTERFACES PARA QR Y CONFIGURACIONES =======
export interface IBusinessQRData {
  businessId: number;
  businessName: string;
  qrCode: string; // Base64 del QR generado
  qrUrl: string; // URL para escanear y acceder al negocio
}

export interface IClientSettings {
  notifications: {
    email: boolean;
    push: boolean;
    rewards: boolean;
    stamps: boolean;
  };
  privacy: {
    profileVisible: boolean;
    shareActivity: boolean;
  };
  preferences: {
    language: string;
    theme: "light" | "dark" | "auto";
  };
}

export interface IBusinessSettings {
  notifications: {
    newClients: boolean;
    rewards: boolean;
    lowStock: boolean;
  };
  business: {
    autoExpireStamps: boolean;
    stampExpirationDays: number;
    requireEmailVerification: boolean;
  };
  marketing: {
    allowPromotions: boolean;
    shareStatistics: boolean;
  };
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
