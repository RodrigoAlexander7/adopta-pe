import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/shared/infrastructure/persistence/prisma/prisma.service';
import { ShelterRepository } from '../../domain/repositories/shelter.repository';
import { Shelter } from '../../domain/entities/shelter.entity';
import { ShelterMapper } from './shelter.mapper';

@Injectable()
export class PrismaShelterRepository implements ShelterRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(shelter: Shelter): Promise<void> {
    const data = ShelterMapper.toPersistence(shelter);
    await this.prisma.client.shelter.create({ data });
  }

  async findAll(): Promise<Shelter[]> {
    const shelters = await this.prisma.client.shelter.findMany({
       orderBy: { name: 'asc' }
    });
    return shelters.map(ShelterMapper.toDomain);
  }

  async findById(id: string): Promise<Shelter | null> {
    const shelter = await this.prisma.client.shelter.findUnique({ where: { id } });
    return shelter ? ShelterMapper.toDomain(shelter) : null;
  }
  
  async findByUserId(userId: string): Promise<Shelter | null> {
    const shelter = await this.prisma.client.shelter.findUnique({ where: { userId } });
    return shelter ? ShelterMapper.toDomain(shelter) : null;
  }
}
