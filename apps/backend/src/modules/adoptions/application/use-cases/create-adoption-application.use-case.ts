import { Injectable } from '@nestjs/common';
import { AdoptionRepository } from '../../domain/repositories/adoption.repository';
import { AdoptionApplication, AdoptionStatus } from '../../domain/entities/adoption-application.entity';

interface CreateAdoptionDto {
  petId: string;
  userId: string;
  message?: string;
  adopterProfileId?: string;
}

@Injectable()
export class CreateAdoptionApplicationUseCase {
  constructor(private readonly adoptionRepository: AdoptionRepository) {}

  async execute(dto: CreateAdoptionDto): Promise<AdoptionApplication> {
    const application = new AdoptionApplication(
      '', // ID placeholder
      AdoptionStatus.PENDING,
      dto.petId,
      dto.userId,
      new Date(),
      new Date(),
      dto.message,
      null, // notes
      dto.adopterProfileId,
    );
    return this.adoptionRepository.create(application);
  }
}
