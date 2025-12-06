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

export class Pet {
  id: string;
  name: string;
  species: PetSpecies;
  breed?: string | null;
  age?: number | null;
  gender: Gender;
  size: PetSize;
  color?: string | null;
  description?: string | null;
  healthInfo?: string | null;
  isAdopted: boolean;
  isActive: boolean;
  images: string[];
  createdAt: Date;
  shelterId: string;

  constructor(
    id: string,
    name: string,
    species: PetSpecies,
    gender: Gender,
    size: PetSize,
    shelterId: string,
    createdAt: Date,
    images: string[] = [],
    isAdopted: boolean = false,
    isActive: boolean = true,
    breed?: string | null,
    age?: number | null,
    color?: string | null,
    description?: string | null,
    healthInfo?: string | null,
  ) {
    this.id = id;
    this.name = name;
    this.species = species;
    this.gender = gender;
    this.size = size;
    this.shelterId = shelterId;
    this.createdAt = createdAt;
    this.images = images;
    this.isAdopted = isAdopted;
    this.isActive = isActive;
    this.breed = breed;
    this.age = age;
    this.color = color;
    this.description = description;
    this.healthInfo = healthInfo;
  }
}
