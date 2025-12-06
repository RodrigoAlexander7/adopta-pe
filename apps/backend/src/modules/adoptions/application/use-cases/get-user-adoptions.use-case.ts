import { Injectable } from '@nestjs/common';
import { AdoptionRepository } from '../../domain/repositories/adoption.repository';
import { AdoptionApplication } from '../../domain/entities/adoption-application.entity';

@Injectable()
export class GetUserAdoptionsUseCase {
  constructor(private readonly adoptionRepository: AdoptionRepository) {}

  async execute(userId: string): Promise<AdoptionApplication[]> {
    return this.adoptionRepository.findByUserId(userId);
  }
}
