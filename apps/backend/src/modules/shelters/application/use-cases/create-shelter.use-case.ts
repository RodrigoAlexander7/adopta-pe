import { Injectable } from '@nestjs/common';
import { ShelterRepository } from '../../domain/repositories/shelter.repository';
import { Shelter } from '../../domain/entities/shelter.entity';
import { v4 as uuidv4 } from 'uuid';

interface CreateShelterDto {
  name: string;
  email: string;
  address: string;
  city: string;
  description?: string;
  userId: string;
}

@Injectable()
export class CreateShelterUseCase {
  constructor(private readonly shelterRepository: ShelterRepository) {}

  async execute(dto: CreateShelterDto): Promise<Shelter> {
    const shelter = new Shelter(
      uuidv4(),
      dto.name,
      dto.email,
      dto.address,
      dto.city,
      dto.userId,
      new Date(),
      dto.description,
    );

    await this.shelterRepository.create(shelter);
    // TODO: We should probably update the User Role to SHELTER here as well.
    return shelter;
  }
}
