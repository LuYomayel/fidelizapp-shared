// Tipos y DTOs compartidos entre frontend y backend

import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';

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

// ======= INTERFACES BÁSICAS =======
export interface IBusiness {
  id?: number | string;
  businessName: string;
  email: string;
  internalPhone?: string;
  externalPhone?: string;
  size: BusinessSize;
  street: string;
  neighborhood: string;
  postalCode: string;
  province: string;
  logoPath?: string;
  type: BusinessType;
  instagram?: string;
  tiktok?: string;
  website?: string;
  createdAt?: Date;
  active?: boolean;
}

export interface IClient {
  id?: number | string;
  email: string;
  firstName: string;
  lastName: string;
  googleId?: string;
  profilePicture?: string;
  provider: UserProvider;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
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

// ======= DTOs CON DECORADORES =======

// Business DTOs
export class CreateBusinessDto {
  @ApiProperty({
    description: 'Nombre del negocio',
    example: 'Panadería La Delicia',
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  businessName: string;

  @ApiProperty({
    description: 'Email del negocio',
    example: 'contacto@ladelicia.com',
    format: 'email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Contraseña del negocio',
    example: 'superSecreta123',
    minLength: 6,
    maxLength: 100,
  })
  @IsNotEmpty()
  @IsString()
  @Length(6, 100)
  password: string;

  @ApiPropertyOptional({
    description: 'Teléfono interno del negocio',
    example: '+54 11 1234-5678',
    maxLength: 20,
  })
  @IsOptional()
  @IsString()
  @Length(1, 20)
  internalPhone?: string;

  @ApiPropertyOptional({
    description: 'Teléfono externo del negocio',
    example: '+54 11 8765-4321',
    maxLength: 20,
  })
  @IsOptional()
  @IsString()
  @Length(1, 20)
  externalPhone?: string;

  @ApiProperty({
    description: 'Tamaño del negocio',
    enum: BusinessSize,
    example: BusinessSize.SMALL,
  })
  @IsEnum(BusinessSize)
  size: BusinessSize;

  @ApiProperty({
    description: 'Dirección del negocio',
    example: 'Av. Siempre Viva 123',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @Length(1, 255)
  street?: string;

  @ApiProperty({
    description: 'Barrio del negocio',
    example: 'Centro',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  neighborhood?: string;

  @ApiProperty({
    description: 'Código postal',
    example: '1000',
    maxLength: 10,
  })
  @IsOptional()
  @IsString()
  @Length(1, 10)
  postalCode?: string;

  @ApiProperty({
    description: 'Provincia',
    example: 'CABA',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  province?: string;

  @ApiProperty({
    description: 'Tipo de negocio',
    enum: BusinessType,
    example: BusinessType.CAFETERIA,
  })
  @IsEnum(BusinessType)
  type: BusinessType;

  @ApiPropertyOptional({
    description: 'Instagram del negocio',
    example: '@negocio',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @Length(1, 255)
  instagram?: string;

  @ApiPropertyOptional({
    description: 'TikTok del negocio',
    example: '@negocio',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @Length(1, 255)
  tiktok?: string;

  @ApiPropertyOptional({
    description: 'Website del negocio',
    example: 'https://www.negocio.com',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @Length(1, 255)
  website?: string;

  @IsOptional()
  logo?: Express.Multer.File;
}

export class UpdateBusinessDto extends PartialType(CreateBusinessDto) {
  @ApiPropertyOptional({
    description: 'Nueva contraseña del negocio',
    minLength: 6,
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @Length(6, 100)
  password?: string;
}

export class LoginBusinessDto {
  @ApiProperty({
    description: 'Email del negocio',
    example: 'contacto@ladelicia.com',
    format: 'email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Contraseña del negocio',
    example: 'superSecreta123',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}

// Client DTOs
export class CreateClientDto {
  @ApiProperty({
    description: 'Email del cliente',
    example: 'cliente@email.com',
    format: 'email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Contraseña del cliente',
    example: 'miPassword123',
    minLength: 6,
    maxLength: 100,
  })
  @IsNotEmpty()
  @IsString()
  @Length(6, 100)
  password: string;

  @ApiProperty({
    description: 'Nombre del cliente',
    example: 'Juan',
    maxLength: 100,
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  firstName: string;

  @ApiProperty({
    description: 'Apellido del cliente',
    example: 'Pérez',
    maxLength: 100,
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  lastName: string;
}

export class UpdateClientDto {
  @ApiPropertyOptional({
    description: 'Email del cliente',
    example: 'cliente@email.com',
    format: 'email',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    description: 'Nueva contraseña del cliente',
    minLength: 6,
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @Length(6, 100)
  password?: string;

  @ApiPropertyOptional({
    description: 'Nombre del cliente',
    example: 'Juan',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  firstName?: string;

  @ApiPropertyOptional({
    description: 'Apellido del cliente',
    example: 'Pérez',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  lastName?: string;
}

export class LoginClientDto {
  @ApiProperty({
    description: 'Email del cliente',
    example: 'cliente@email.com',
    format: 'email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Contraseña del cliente',
    example: 'miPassword123',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
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
  extends Omit<CreateClientDto, 'password'> {
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

// ======= LEGACY INTERFACES PARA COMPATIBILIDAD =======
export type Client = IClient; // Mantener compatibilidad
export type UpdateClientDtoLegacy = Partial<CreateClientDto>; // Mantener compatibilidad
export type UpdateBusinessDtoLegacy = Partial<
  Omit<CreateBusinessDto, 'password'>
>; // Mantener compatibilidad
