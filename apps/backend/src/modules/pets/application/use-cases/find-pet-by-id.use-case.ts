import { Injectable } from '@nestjs/common';
import { PetRepository } from '../../domain/repositories/pet.repository';
import { Pet } from '../../domain/entities/pet.entity';

@Injectable()
export class FindPetByIdUseCase {
  constructor(private readonly petRepository: PetRepository) {}

  async execute(id: string): Promise<Pet | null> {
    return this.petRepository.findById(id);
  }
}
