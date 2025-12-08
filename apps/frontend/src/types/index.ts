// User types
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: UserRole;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export enum UserRole {
  ADOPTER = 'ADOPTER',
  SHELTER = 'SHELTER',
  ADMIN = 'ADMIN',
}

// Pet types
export interface Pet {
  id: string;
  name: string;
  species: PetSpecies;
  breed?: string;
  age?: number;
  ageUnit?: AgeUnit;
  gender: Gender;
  size: PetSize;
  color?: string;
  description?: string;
  healthInfo?: string;
  isAdopted: boolean;
  isActive: boolean;
  images: string[];
  createdAt: string;
  shelterId: string;
  shelter?: Shelter;
}

export enum PetSpecies {
  DOG = 'DOG',
  CAT = 'CAT',
  BIRD = 'BIRD',
  RABBIT = 'RABBIT',
  SQUIRREL = 'SQUIRREL',
  OTHER = 'OTHER',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum PetSize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

export enum AgeUnit {
  YEARS = 'YEARS',
  MONTHS = 'MONTHS',
}

// Shelter types
export interface Shelter {
  id: string;
  name: string;
  description?: string;
  email: string;
  phone?: string;
  address: string;
  city: string;
  website?: string;
  logo?: string;
  isVerified: boolean;
  createdAt: string;
  userId: string;
}

// Story types
export interface Story {
  id: string;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user?: User;
}

// Adoption types
export interface AdoptionForm {
  id: string;
  status: AdoptionStatus;
  message?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  petId: string;
  pet?: Pet;
  userId: string;
  user?: User;
  adopterProfileId?: string;
}

export enum AdoptionStatus {
  PENDING = 'PENDING',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  COMPLETED = 'COMPLETED',
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// Form types
export interface CreatePetDto {
  name: string;
  species: PetSpecies;
  breed?: string;
  age?: number;
  ageUnit?: AgeUnit;
  gender: Gender;
  size: PetSize;
  color?: string;
  description?: string;
  healthInfo?: string;
  images: string[];
}

export interface CreateStoryDto {
  title: string;
  content: string;
  image?: string;
}

export interface CreateShelterDto {
  name: string;
  description?: string;
  email: string;
  phone?: string;
  address: string;
  city: string;
  website?: string;
  logo?: string;
}

export interface CreateAdoptionDto {
  petId: string;
  message?: string;
}
