import { Injectable } from '@nestjs/common';
import { PetRepository } from '../../domain/repositories/pet.repository';
import { Pet, PetSpecies, Gender, PetSize } from '../../domain/entities/pet.entity';

interface CreatePetDto {
  name: string;
  species: PetSpecies;
  gender: Gender;
  size: PetSize;
  shelterId: string;
  images?: string[];
  breed?: string;
  age?: number;
  color?: string;
  description?: string;
  healthInfo?: string;
}

@Injectable()
export class CreatePetUseCase {
  constructor(private readonly petRepository: PetRepository) {}

  async execute(dto: CreatePetDto): Promise<Pet> {
    const pet = new Pet(
      '', // ID placeholder
      dto.name,
      dto.species,
      dto.gender,
      dto.size,
      dto.shelterId,
      new Date(), // createdAt
      dto.images || [],
      false, // isAdopted
      true, // isActive
      dto.breed,
      dto.age,
      dto.color,
      dto.description,
      dto.healthInfo,
    );
    return this.petRepository.create(pet);
  }
}
