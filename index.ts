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
  VINERIA = 'Vineria',
  LAVADERO_DE_AUTOS = 'Lavadero de autos',
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

// ======= ENUMS PARA SISTEMA DE RECOMPENSAS =======
export enum RedemptionStatus {
  PENDING = 'pending',
  DELIVERED = 'delivered',
  EXPIRED = 'expired',
  CANCELLED = 'cancelled',
}

export enum RewardType {
  FREE_PRODUCT = 'producto_gratis',
  DISCOUNT = 'descuento',
  OTHER = 'otro',
}

// ======= ENUMS/DTOS PARA ANUNCIOS =======
export enum AnnouncementType {
  NEWS = 'NEWS',
  EVENT = 'EVENT',
  PROMOTION = 'PROMOTION',
}

export interface IAnnouncement {
  id: number;
  businessId: number;
  title: string;
  content: string;
  type: AnnouncementType;
  imagePath?: string;
  imageUrl?: string;
  startDate?: Date | null;
  endDate?: Date | null;
  allDay?: boolean;
  startTime?: string | null; // HH:MM
  endTime?: string | null; // HH:MM
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateAnnouncementDto {
  title: string;
  content: string;
  type: AnnouncementType;
  startDate?: Date | null;
  endDate?: Date | null;
  allDay?: boolean; // Evento de día completo
  startTime?: string | null; // HH:MM
  endTime?: string | null; // HH:MM
}

export interface IUpdateAnnouncementDto
  extends Partial<ICreateAnnouncementDto> {
  isPublished?: boolean;
  imagePath?: string | null;
}

// ======= INTERFACES PARA USUARIOS/AUTENTICACIÓN =======
// Interfaces para tipificar req.user en diferentes contextos

export interface BaseUser {
  userId: number;
  username: string;
  type: 'client' | 'business' | 'platform';
}

export interface ClientUser extends BaseUser {
  type: 'client';
  clientId: number;

  email: string;
  emailVerified: boolean;
  provider: 'email' | 'google';
  firstName?: string;
  lastName?: string;
  picture?: string;
}

export interface BusinessUser extends BaseUser {
  type: 'business';
  businessId: number;
  email: string;
  emailVerified: boolean;
  provider: 'email' | 'google';
  picture?: string;
}

export interface PlatformAdminUser extends BaseUser {
  type: 'platform';
  email: string;
  role: 'superadmin' | 'admin';
}

// Union type para req.user
export type AuthenticatedUser = ClientUser | BusinessUser | PlatformAdminUser;

// Interfaces para el payload del JWT
export interface BaseJwtPayload {
  username: string;
  sub: number;
  type: 'client' | 'business' | 'platform';
  suspended: string | null;
}

export interface ClientJwtPayload extends BaseJwtPayload {
  type: 'client';
  email: string;
  provider: 'email' | 'google';
  emailVerified: boolean;
}

export interface BusinessJwtPayload extends BaseJwtPayload {
  type: 'business';
  email: string;
  provider: 'email' | 'google';
  emailVerified: boolean;
}

export interface PlatformJwtPayload extends BaseJwtPayload {
  type: 'platform';
  email: string;
  role: 'superadmin' | 'admin';
}

export type JwtPayload =
  | ClientJwtPayload
  | BusinessJwtPayload
  | PlatformJwtPayload;

// Type guards para verificar el tipo de usuario
export function isClientUser(user: AuthenticatedUser): user is ClientUser {
  return user.type === 'client';
}

export function isBusinessUser(user: AuthenticatedUser): user is BusinessUser {
  return user.type === 'business';
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
  adminFirstName: string; // Nombre del administrador del negocio
  adminLastName: string; // Apellido del administrador del negocio
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
  emailVerified?: boolean; // Si el email ha sido verificado
  emailVerificationCode?: string; // Código de verificación de email
  emailVerificationCodeExpiry?: Date; // Fecha de expiración del código
  mustChangePassword?: boolean; // Si debe cambiar la contraseña
  status?: 'draft' | 'active' | 'disabled';
  preRegistrationToken?: string;
  createdAt?: Date;
  updatedAt?: Date;
  active?: boolean;
  suspendedAt?: Date | null;
  suspendedReason?: string;
  suspended?: string | null; // Para respuestas de login

  // Información de suscripción
  subscriptionPlanId?: number;
  currentSubscription?: IBusinessSubscription;
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
  emailVerified: boolean;
  mustChangePassword: boolean;
  suspendedAt?: Date | null;
  suspendedReason?: string;
  suspended?: string | null; // Para respuestas de login
}

// ======= INTERFACES PARA SISTEMA DE SUSCRIPCIONES =======

// Tipo más flexible para tiers de suscripción
export type SubscriptionTier = string;

// Tiers predefinidos comunes (puedes crear más según necesites)
export const SUBSCRIPTION_TIERS = {
  BETA: 'beta', // Plan beta/conejillo de indias (oculto, activado por código)
  FREE: 'free', // Plan gratuito
  BASIC: 'basic', // Plan básico
  STANDARD: 'standard', // Plan estándar
  PREMIUM: 'premium', // Plan premium
  ENTERPRISE: 'enterprise', // Plan empresarial
} as const;

export enum SubscriptionStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  EXPIRED = 'expired',
  CANCELLED = 'cancelled',
}

// ======= ENUMS PARA CÓDIGOS PROMOCIONALES =======
export enum PromoCodeType {
  UNLOCK_PLAN = 'unlock_plan', // Desbloquea un plan específico (ej: tier beta)
  DISCOUNT_PERCENTAGE = 'discount_percentage', // Descuento porcentual (ej: 20% off)
  DISCOUNT_FIXED = 'discount_fixed', // Descuento fijo (ej: $500 off)
  FREE_TRIAL = 'free_trial', // Período de prueba gratis extendido
  FREE_MONTHS = 'free_months', // Meses gratis (ej: primer mes gratis)
  UPGRADE_PLAN = 'upgrade_plan', // Upgrade gratuito a plan superior por X tiempo
}

export enum PromoCodeStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  EXPIRED = 'expired',
  EXHAUSTED = 'exhausted', // Cuando se agotaron los usos
}

export interface ISubscriptionPlan {
  id: number;
  name: string;
  description: string;
  tier: SubscriptionTier;
  price: number; // Precio en centavos
  currency: string; // 'ARS', 'USD', etc.
  billingPeriod: 'monthly' | 'yearly';
  features: string[]; // Lista de características incluidas
  maxClients?: number; // Límite de clientes (null = ilimitado)
  maxStamps?: number; // Límite de sellos por mes (null = ilimitado)
  maxRewards?: number; // Límite de recompensas activas (null = ilimitado)
  isPublic: boolean; // Si se muestra públicamente o requiere código
  isActive: boolean; // Si está disponible para contratación
  trialDays?: number; // Días de prueba gratuita
  createdAt: Date;
  updatedAt: Date;
}

export interface IPromotionalCode {
  id: number;
  code: string; // Código único
  type: PromoCodeType; // Tipo de código promocional
  status: PromoCodeStatus; // Estado del código

  // Configuración según tipo
  subscriptionPlanId?: number; // Plan que desbloquea (para UNLOCK_PLAN)
  targetPlanId?: number; // Plan objetivo (para UPGRADE_PLAN)
  discountValue?: number; // Valor del descuento (porcentaje o monto fijo)
  freeMonths?: number; // Cantidad de meses gratis (para FREE_MONTHS)
  trialDays?: number; // Días de prueba extendidos (para FREE_TRIAL)

  // Configuración general
  maxUses?: number; // Máximo número de usos (null = ilimitado)
  currentUses: number; // Usos actuales
  expiresAt?: Date; // Fecha de expiración (opcional)
  isActive: boolean;
  createdBy: number; // ID del admin que lo creó
  description?: string; // Descripción del código
  createdAt: Date;
  updatedAt: Date;

  // Relaciones
  subscriptionPlan?: ISubscriptionPlan; // Plan que desbloquea
  targetPlan?: ISubscriptionPlan; // Plan objetivo para upgrade
}

export interface IBusinessSubscription {
  id: number;
  businessId: number;
  subscriptionPlanId: number;
  status: SubscriptionStatus;
  startDate: Date;
  endDate?: Date; // null para suscripciones permanentes
  promotionalCodeId?: number; // Si se activó con código promocional
  paymentId?: string; // ID de pago externo (Stripe, MercadoPago, etc.)
  autoRenew: boolean;
  createdAt: Date;
  updatedAt: Date;

  // Relaciones
  plan?: ISubscriptionPlan;
  business?: IBusiness;
  promotionalCode?: IPromotionalCode;
}

// DTOs para crear/actualizar
export interface ICreateSubscriptionPlanDto {
  name: string;
  description: string;
  tier: SubscriptionTier;
  price: number;
  currency: string;
  billingPeriod: 'monthly' | 'yearly';
  features: string[];
  maxClients?: number;
  maxStamps?: number;
  maxRewards?: number;
  isPublic: boolean;
  isActive: boolean;
  trialDays?: number;
}

export interface IUpdateSubscriptionPlanDto
  extends Partial<ICreateSubscriptionPlanDto> {
  isActive?: boolean;
}

export interface ICreatePromotionalCodeDto {
  code: string;
  type: PromoCodeType;

  // Configuración según tipo
  subscriptionPlanId?: number; // Para UNLOCK_PLAN
  targetPlanId?: number; // Para UPGRADE_PLAN
  discountValue?: number; // Para DISCOUNT_PERCENTAGE y DISCOUNT_FIXED
  freeMonths?: number; // Para FREE_MONTHS
  trialDays?: number; // Para FREE_TRIAL

  // Configuración general
  maxUses?: number;
  expiresAt?: Date;
  isActive?: boolean;
  description?: string;
}

export interface IUpdatePromotionalCodeDto
  extends Partial<ICreatePromotionalCodeDto> {
  status?: PromoCodeStatus;
}

export interface IValidatePromotionalCodeDto {
  code: string;
  subscriptionPlanId?: number; // Para validar si el código aplica a un plan específico
}

export interface IValidatePromotionalCodeResponse {
  valid: boolean;
  code?: IPromotionalCode;
  message: string;

  // Información específica según tipo
  unlocksPlan?: ISubscriptionPlan;
  discount?: {
    type: 'percentage' | 'fixed';
    value: number;
  };
  freeMonths?: number;
  trialDays?: number;
  upgradesPlan?: ISubscriptionPlan;
}

export interface ISubscriptionSelectionDto {
  subscriptionPlanId: number;
  promotionalCode?: string;
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

export interface IStampHistory {
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
  client?: IClient; // Relación con el cliente
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

// Interfaz extendida para respuestas de API que incluyen información de recompensas
export interface IClientCardWithReward extends IClientCard {
  nearestReward?: {
    id: number;
    name: string;
    stampsCost: number;
    description: string;
  };
  progressTarget: number;
  availableRewards: IReward[];
  rewardStamps?: number[]; // TODOS los sellos que tienen recompensas (sin importar si se pueden canjear)
  redeemableStamps?: number[]; // Solo los sellos que YA se pueden canjear
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
  type: RewardType; // Tipo de recompensa
  typeDescription?: string; // Descripción adicional para tipo "otro"
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
  pendingRedemptions: IRewardRedemptionWithClientCard[];
  recentDeliveries: IRewardRedemptionWithClientCard[];
}

// Interfaz extendida para RewardRedemption que incluye ClientCard con recompensas
export interface IRewardRedemptionWithClientCard
  extends Omit<IRewardRedemption, 'clientCard'> {
  clientCard: IClientCardWithReward;
}

export interface IDeliverRedemptionDto {
  redemptionId: number;
  employeeId: number;
  notes?: string;
}

export interface IRedemptionFilters {
  status?: RedemptionStatus;
  dateFrom?: Date;
  dateTo?: Date;
  clientId?: number;
  rewardId?: number;
  search?: string;
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

// ======= PLATFORM ADMIN =======
export interface IPlatformAdminSummary {
  totalBusinesses: number;
  totalClients: number;
  totalUsers: number;
}

export interface IDashboard {
  totalStamps: number;
  activeClients: number;
  rewardsExchanged: number;
  clientRetention: number;
  recentClients: IClientCardWithReward[];
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

// ======= INTERFAZ PARA ESTADÍSTICAS COMPLETAS =======
export interface IStatistics {
  // Métricas principales
  stampsIssued: {
    total: number; // Sellos del mes actual
    totalHistoric: number; // Total histórico de sellos desde el inicio
    currentMonth: number;
    previousMonth: number;
    growth: number; // Porcentaje de crecimiento
  };

  activeClients: {
    total: number;
    currentMonth: number;
    previousMonth: number;
    growth: number;
  };

  rewardsRedeemed: {
    total: number; // Recompensas del mes actual
    totalHistoric: number; // Total histórico de recompensas desde el inicio
    currentMonth: number;
    previousMonth: number;
    growth: number;
  };

  clientRetention: {
    rate: number; // Porcentaje de retención
    currentPeriod: number; // Retención período actual
    previousPeriod: number; // Retención período anterior
    growth: number; // Cambio en retención
  };

  // Métricas avanzadas
  visitFrequency: {
    averageDaysBetweenStamps: number; // Promedio de días entre sellos obtenidos
    medianDaysBetweenStamps: number; // Mediana de días entre sellos obtenidos
    trailing90dAvg: number; // Promedio de días entre sellos obtenidos en los últimos 90 días
    trailing90dMedian: number; // Mediana de días entre sellos obtenidos en los últimos 90 días
    growth90d: number; // Cambio porcentual de días entre sellos obtenidos en los últimos 90 días
    averageStampsPerClient: number;
    averageVisitsPerMonth: number;
    mostActiveClients: Array<{
      clientId: number;
      clientName: string;
      totalStamps: number;
      lastVisit: Date;
    }>;
  };

  completionTime: {
    averageDaysToComplete: number; // Días promedio desde primer sello hasta primera recompensa en el mes
    medianDaysToComplete: number; // Mediana de días desde primer sello hasta primera recompensa en el mes
    trailing180dAvg: number; // Promedio de días desde primer sello hasta primera recompensa en los últimos 180 días
    prev180dAvg: number; // Promedio de días desde primer sello hasta primera recompensa en los últimos 180 días
    growth180d: number; // Cambio porcentual de días desde primer sello hasta primera recompensa en los últimos 180 días
    fastestCompletion: number;
    slowestCompletion: number;
    completionDistribution: Array<{
      daysRange: string;
      clientCount: number;
    }>;
  };

  conversionRate: {
    clientsWhoRedeem: number; // % de clientes con sellos que canjearon recompensas en el mes
    currentMonth: number; // Tasa del mes actual
    previousMonth: number; // Tasa del mes anterior
    growth: number; // Cambio porcentual
    stampsToRewards: number; // % de sellos que se convierten en recompensas
    averageStampsBeforeRedemption: number;
  };

  // Datos adicionales para insights
  periodComparison: {
    period: 'month' | 'quarter' | 'year';
    current: Date;
    previous: Date;
  };

  recentActivity: {
    newClients: Array<{
      clientId: number;
      clientName: string;
      email: string;
      joinedAt: Date;
      totalStamps: number;
      availableStamps: number;
    }>;
    recentRedemptions: Array<{
      clientName: string;
      rewardName: string;
      redeemedAt: Date;
      stampsSpent: number;
    }>;
  };
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
  adminFirstName: string; // Nombre del administrador del negocio
  adminLastName: string; // Apellido del administrador del negocio
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
  adminFirstName?: string; // Nombre del administrador del negocio
  adminLastName?: string; // Apellido del administrador del negocio
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
  //stampType?: StampType;
  purchaseType?: PurchaseType;
  dateFrom?: Date;
  dateTo?: Date;
  clientId?: number | string;
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
  adminFirstName: string; // Nombre del administrador del negocio
  adminLastName: string; // Apellido del administrador del negocio
  internalPhone?: string;
  externalPhone?: string;
  size: BusinessSize;
  street?: string;
  neighborhood?: string;
  postalCode?: string;
  province?: string;
  logoPath?: string;
  logoUrl?: string;
  type: BusinessType;
  customType?: string;
  instagram?: string;
  tiktok?: string;
  website?: string;
  stampsForReward: number;
  rewardDescription?: string;
  emailVerified: boolean;
  mustChangePassword: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IClientProfile {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  profilePictureUrl?: string;
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
  adminFirstName?: string; // Nombre del administrador del negocio
  adminLastName?: string; // Apellido del administrador del negocio
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
  firstName?: string;
  lastName?: string;
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
  qrUrl: string; // URL que contiene el QR
}

// Nueva interfaz para solicitud de asociación con negocio
export interface IJoinBusinessDto {
  businessId: number;
}

// Nueva interfaz para respuesta de asociación con negocio
export interface IJoinBusinessResponse {
  clientCard: IClientCard;
  business: IBusiness;
  message: string;
  isNewCard: boolean; // Si es una nueva tarjeta o ya existía
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
    theme: 'light' | 'dark' | 'auto';
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

// ======= INTERFACES DE EMPLEADOS =======
export interface IEmployee {
  id: number;
  firstName: string;
  lastName: string;
  isDefault: boolean;
  businessId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateEmployeeDto {
  firstName: string;
  lastName: string;
  isDefault?: boolean;
}

export interface IUpdateEmployeeDto {
  firstName?: string;
  lastName?: string;
  isDefault?: boolean;
}

export interface IEmployeeFilters extends PaginationParams {
  search?: string;
  isDefault?: boolean;
}

// ======= INTERFACES PARA VERIFICACIÓN DE EMAIL =======
export interface IVerifyEmailDto {
  email: string;
  verificationCode: string;
}

export interface IResendVerificationCodeDto {
  email: string;
}

export interface IEmailVerificationResponse {
  success: boolean;
  message: string;
  redirectTo?: string;
}

export interface ICreateEOIDto {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface IEOI {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
}
// Nuevos tipos para el sistema de sellos
export type Stamp = IStamp;
export type ClientCard = IClientCard;
export type StampRedemption = IStampRedemption;
export type CreateStampDto = ICreateStampDto;
export type RedeemStampDto = IRedeemStampDto;
export type StampSummaryDto = IStampSummaryDto;
export type ClientCardSummaryDto = IClientCardSummaryDto;

// ======= MERCADO PAGO SUBSCRIPTIONS =======

export enum MpSubscriptionIntentStatus {
  INITIATED = 'initiated',
  CREATED_IN_MP = 'created_in_mp',
  CONFIRMED = 'confirmed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

export enum MpPreapprovalStatus {
  PENDING = 'pending',
  AUTHORIZED = 'authorized',
  ACTIVE = 'active',
  PAUSED = 'paused',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired',
}

export enum MpPreapprovalPlanStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum MpWebhookTopic {
  SUBSCRIPTION_PREAPPROVAL = 'subscription_preapproval',
  SUBSCRIPTION_AUTHORIZED_PAYMENT = 'subscription_authorized_payment',
  SUBSCRIPTION_PREAPPROVAL_PLAN = 'subscription_preapproval_plan',
}

// ======= ENTIDADES/MAPPINGS =======

export interface IMpSubscriptionPlanMapping {
  id: number;
  planId: number;
  mpPreapprovalPlanId: string;
  initPoint: string;
  backUrl: string;
  currencyId: string; // 'ARS'
  frequency: number; // 1
  frequencyType: 'days' | 'months';
  transactionAmount: number; // 1000.00
  collectorId: number;
  status: string; // 'active' | 'inactive'
  raw: any;
  createdAt: Date;
  updatedAt: Date;
  plan?: ISubscriptionPlan; // tu interfaz existente
}

export interface IMpBusinessSubscriptionMapping {
  id: number;
  businessSubscriptionId?: number;
  mpPreapprovalId: string;
  mpPreapprovalPlanId: string;
  status: string; // 'pending' | 'authorized' | 'active' | 'paused' | 'cancelled' ...
  statusDetail?: string;
  payerEmail: string;
  externalReference?: string;
  nextPaymentDate?: Date;
  pausedAt?: Date;
  cancelledAt?: Date;
  lastWebhookAt?: Date;
  raw: any;
  createdAt: Date;
  updatedAt: Date;
  businessSubscription?: IBusinessSubscription; // tu interfaz existente
}

export interface IMpSubscriptionIntent {
  id: number;
  businessId: number;
  planId: number;
  promotionalCodeId?: number;
  mpPreapprovalPlanId?: string;
  mpPreapprovalId?: string;
  status: MpSubscriptionIntentStatus;
  idempotencyKey: string;
  externalReference?: string;
  attempts: number;
  lastError?: string;
  payload: any;
  createdAt: Date;
  updatedAt: Date;
}

// ======= DTOs REQUEST =======

export interface ICreateMpIntentDto {
  businessId: number;
  planId: number;
  source: 'plan_redirect' | 'direct_card';
  /** requerido solo si source === 'direct_card' (el DTO de clase valida con @ValidateIf) */
  payerEmail?: string;
  promotionalCodeId?: number;
  externalReference?: string;
  /** requerido solo si source === 'direct_card' */
  cardToken?: string;
  idempotencyKey?: string;
  returnUrl?: string;
}

export interface IUpdateMpPreapprovalDto {
  status?: 'paused' | 'authorized' | 'cancelled' | 'resume';
  cardToken?: string;
  billingDay?: number; // 1..28
  reason?: string;
}

export interface ILinkPreapprovalDto {
  /** tu intent interno para resolver idempotencia y vínculos */
  intentId: number;
  /** preapproval_id que devuelve MP */
  mpPreapprovalId: string;
  /** tu external reference (opcional) para conciliar */
  externalReference?: string;
}

// Raw webhook (tal cual lo envía MP). Útil para guardar/auditar sin transformar.
export interface IMpWebhookEvent {
  id?: string;
  live_mode: boolean;
  type: string; // puede venir como "payment" en viejas versiones o el topic textual
  date_created: string;
  application_id: string;
  user_id: string;
  version: string;
  api_version: string;
  action: string;
  data: { id: string };
}

// Webhook normalizado que usa tu controller/servicio internamente
export interface IMpWebhookDto {
  /** resource id: puede venir como body.id o body.data.id según el topic */
  id: string;
  /** topic esperado: subscription_preapproval | subscription_authorized_payment | subscription_preapproval_plan */
  topic?: string;
  action?: string;
  live_mode?: boolean;
  /** payload “tal cual vino”, por si querés guardarlo */
  data?: Record<string, any>;
}

// ======= DTOs/REQUEST para crear plan y preapproval (si usás API directa) =======

export interface IMpPreapprovalPlanRequest {
  reason: string;
  auto_recurring: {
    frequency: number;
    frequency_type: 'days' | 'months';
    transaction_amount: number;
    currency_id: string;
  };
  payment_methods_allowed?: {
    payment_types?: Array<{ id: string }>;
    payment_methods?: Array<{ id: string }>;
  };
  back_url: string; // requerido por MP
  free_trial?: {
    frequency: number;
    frequency_type: 'days' | 'months';
  };
}

export interface IMpPreapprovalRequest {
  preapproval_plan_id: string;
  reason: string;
  payer_email: string;
  card_token_id?: string; // solo si vas por direct card
  auto_recurring?: {
    frequency: number;
    frequency_type: 'days' | 'months';
    transaction_amount: number;
    currency_id: string;
    start_date?: string;
    end_date?: string;
  };
  back_url?: string;
  external_reference?: string;
  status?: string; // 'authorized'|'paused'...
}

// ======= RESPONSES =======

export interface IMpCreateIntentResponse {
  intentId: number;
  mpPreapprovalId: string;
  status: MpSubscriptionIntentStatus;
  idempotencyKey: string;
  checkoutUrl: string;
}

export interface IMpPlanMappingResponse {
  planId: number;
  mpPreapprovalPlanId: string;
  status: string;
  created: boolean;
}

export interface IMpPreapprovalSyncResponse {
  mpPreapprovalId: string;
  status: string;
  payerEmail: string;
  nextPaymentDate?: Date;
  raw: any;
  updated: boolean;
}
