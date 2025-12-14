import { PetSpecies, PetSize, Gender, AgeUnit, AdoptionStatus, UserRole } from '@/types';

// Pet constants
export const PET_SPECIES_LABELS: Record<PetSpecies, string> = {
  [PetSpecies.DOG]: 'Perro',
  [PetSpecies.CAT]: 'Gato',
  [PetSpecies.BIRD]: 'Ave',
  [PetSpecies.RABBIT]: 'Conejo',
  [PetSpecies.SQUIRREL]: 'Ardilla',
  [PetSpecies.OTHER]: 'Otro',
};

export const PET_SIZE_LABELS: Record<PetSize, string> = {
  [PetSize.SMALL]: 'Pequeño',
  [PetSize.MEDIUM]: 'Mediano',
  [PetSize.LARGE]: 'Grande',
};

export const GENDER_LABELS: Record<Gender, string> = {
  [Gender.MALE]: 'Macho',
  [Gender.FEMALE]: 'Hembra',
};

export const AGE_UNIT_LABELS: Record<AgeUnit, string> = {
  [AgeUnit.YEARS]: 'Años',
  [AgeUnit.MONTHS]: 'Meses',
};

// Adoption status constants
export const ADOPTION_STATUS_LABELS: Record<AdoptionStatus, string> = {
  [AdoptionStatus.PENDING]: 'Pendiente',
  [AdoptionStatus.UNDER_REVIEW]: 'En Revisión',
  [AdoptionStatus.APPROVED]: 'Aprobado',
  [AdoptionStatus.REJECTED]: 'Rechazado',
  [AdoptionStatus.COMPLETED]: 'Completado',
};

export const ADOPTION_STATUS_COLORS: Record<AdoptionStatus, string> = {
  [AdoptionStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
  [AdoptionStatus.UNDER_REVIEW]: 'bg-blue-100 text-blue-800',
  [AdoptionStatus.APPROVED]: 'bg-green-100 text-green-800',
  [AdoptionStatus.REJECTED]: 'bg-red-100 text-red-800',
  [AdoptionStatus.COMPLETED]: 'bg-purple-100 text-purple-800',
};

// User role constants
export const USER_ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.ADOPTER]: 'Adoptante',
  [UserRole.SHELTER]: 'Refugio',
  [UserRole.ADMIN]: 'Administrador',
};

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    ME: '/auth/me',
    LOGOUT: '/auth/logout',
    GOOGLE: '/auth/google',
  },
  PETS: {
    BASE: '/pets',
    BY_ID: (id: string) => `/pets/${id}`,
    MY_PETS: '/pets/me',
  },
  STORIES: {
    BASE: '/stories',
    BY_ID: (id: string) => `/stories/${id}`,
    MY_STORIES: '/stories/me',
  },
  SHELTERS: {
    BASE: '/shelters',
    BY_ID: (id: string) => `/shelters/${id}`,
  },
  ADOPTIONS: {
    BASE: '/adoptions',
    MY_ADOPTIONS: '/adoptions/me',
    BY_SHELTER: '/adoptions/shelter',
  },
  USERS: {
    ME: '/users/me',
  },
};

// Form validation constants
export const VALIDATION = {
  PET_NAME_MIN_LENGTH: 2,
  PET_NAME_MAX_LENGTH: 50,
  STORY_TITLE_MIN_LENGTH: 5,
  STORY_TITLE_MAX_LENGTH: 100,
  STORY_CONTENT_MIN_LENGTH: 50,
  SHELTER_NAME_MIN_LENGTH: 3,
  SHELTER_NAME_MAX_LENGTH: 100,
  MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
};
