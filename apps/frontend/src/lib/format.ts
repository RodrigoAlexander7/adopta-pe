import { AdoptionStatus, PetSpecies, PetSize, Gender, AgeUnit } from '@/types';
import {
  ADOPTION_STATUS_LABELS,
  PET_SPECIES_LABELS,
  PET_SIZE_LABELS,
  GENDER_LABELS,
  AGE_UNIT_LABELS,
} from './constants';

/**
 * Format date to readable string
 */
export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);
}

/**
 * Format date to relative time (e.g., "2 days ago")
 */
export function formatRelativeTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  
  return formatDate(d);
}

/**
 * Get adoption status badge color classes
 */
export function getStatusColor(status: AdoptionStatus): string {
  const colors = {
    [AdoptionStatus.PENDING]: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    [AdoptionStatus.UNDER_REVIEW]: 'bg-blue-100 text-blue-800 border-blue-200',
    [AdoptionStatus.APPROVED]: 'bg-green-100 text-green-800 border-green-200',
    [AdoptionStatus.REJECTED]: 'bg-red-100 text-red-800 border-red-200',
    [AdoptionStatus.COMPLETED]: 'bg-purple-100 text-purple-800 border-purple-200',
  };
  return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
}

/**
 * Get readable label for adoption status
 */
export function getStatusLabel(status: AdoptionStatus): string {
  return ADOPTION_STATUS_LABELS[status] || status;
}

/**
 * Get readable label for pet species
 */
export function getSpeciesLabel(species: PetSpecies): string {
  return PET_SPECIES_LABELS[species] || species;
}

/**
 * Get readable label for pet size
 */
export function getSizeLabel(size: PetSize): string {
  return PET_SIZE_LABELS[size] || size;
}

/**
 * Get readable label for gender
 */
export function getGenderLabel(gender: Gender): string {
  return GENDER_LABELS[gender] || gender;
}

/**
 * Get readable label for age unit
 */
export function getAgeUnitLabel(unit: AgeUnit): string {
  return AGE_UNIT_LABELS[unit] || unit;
}

/**
 * Format pet age with unit
 */
export function formatPetAge(age?: number, unit?: AgeUnit): string {
  if (!age || !unit) return 'Age unknown';
  return `${age} ${getAgeUnitLabel(unit).toLowerCase()}`;
}

/**
 * Truncate text to specified length
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
}

/**
 * Format file size to readable string
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}
