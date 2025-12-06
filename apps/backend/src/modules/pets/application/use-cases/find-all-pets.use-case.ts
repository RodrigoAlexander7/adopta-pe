import { Injectable } from '@nestjs/common';
import { PetRepository } from '../../domain/repositories/pet.repository';
import { Pet } from '../../domain/entities/pet.entity';

@Injectable()
export class FindAllPetsUseCase {
  constructor(private readonly petRepository: PetRepository) {}

  async execute(filters: any): Promise<Pet[]> {
    return this.petRepository.findAll(filters);
  }
}
