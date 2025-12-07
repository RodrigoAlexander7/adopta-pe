import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/shared/infrastructure/persistence/prisma/prisma.service';
import { AdoptionRepository } from '../../domain/repositories/adoption.repository';
import { AdoptionApplication, AdoptionStatus } from '../../domain/entities/adoption-application.entity';
import { AdoptionMapper } from './adoption.mapper';

@Injectable()
export class PrismaAdoptionRepository implements AdoptionRepository {
  constructor(private prisma: PrismaService) {}

  async create(application: AdoptionApplication): Promise<AdoptionApplication> {
    const data = AdoptionMapper.toPersistence(application);
    const { id, ...rest } = data;

    const created = await this.prisma.adoptionForm.create({
      data: {
        ...rest,
        id: id || undefined,
      },
    });
    return AdoptionMapper.toDomain(created);
  }

  async findById(id: string): Promise<AdoptionApplication | null> {
    const found = await this.prisma.adoptionForm.findUnique({
      where: { id },
    });
    return found ? AdoptionMapper.toDomain(found) : null;
  }

  async findByUserId(userId: string): Promise<AdoptionApplication[]> {
    const found = await this.prisma.adoptionForm.findMany({
      where: { userId },
    });
    return found.map(AdoptionMapper.toDomain);
  }

  async findByShelterId(shelterId: string): Promise<AdoptionApplication[]> {
    const found = await this.prisma.adoptionForm.findMany({
      where: {
        pet: {
          shelterId: shelterId,
        },
      },
    });
    return found.map(AdoptionMapper.toDomain);
  }

  async updateStatus(id: string, status: AdoptionStatus): Promise<AdoptionApplication> {
    const updated = await this.prisma.adoptionForm.update({
      where: { id },
      data: { status: status as any },
    });
    return AdoptionMapper.toDomain(updated);
  }
}
