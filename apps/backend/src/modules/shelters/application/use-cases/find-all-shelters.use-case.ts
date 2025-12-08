import { Injectable } from '@nestjs/common';
import { ShelterRepository } from '../../domain/repositories/shelter.repository';
import { Shelter } from '../../domain/entities/shelter.entity';

@Injectable()
export class FindAllSheltersUseCase {
  constructor(private readonly shelterRepository: ShelterRepository) {}

  async execute(): Promise<Shelter[]> {
    return this.shelterRepository.findAll();
  }
}
