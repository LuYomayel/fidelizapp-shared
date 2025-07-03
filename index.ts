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
  street: string;
  neighborhood: string;
  postalCode: string;
  province: string;
  logoPath?: string;
  type: BusinessType;
  customType?: string;
  instagram?: string;
  tiktok?: string;
  website?: string;
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

export interface CreateClientDto extends Omit<Client, "id"> {
  password: string;
}

export type UpdateClientDto = Partial<Omit<CreateClientDto, "password">>;
