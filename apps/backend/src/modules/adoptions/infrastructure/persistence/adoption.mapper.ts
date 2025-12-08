import { AdoptionForm as PrismaAdoption, AdoptionStatus as PrismaAdoptionStatus } from '@generated/prisma/client';
import { AdoptionApplication, AdoptionStatus } from '../../domain/entities/adoption-application.entity';

export class AdoptionMapper {
  static toDomain(prismaAdoption: PrismaAdoption): AdoptionApplication {
    return new AdoptionApplication(
      prismaAdoption.id,
      AdoptionStatus[prismaAdoption.status as keyof typeof AdoptionStatus],
      prismaAdoption.petId,
      prismaAdoption.userId,
      prismaAdoption.createdAt,
      prismaAdoption.updatedAt,
      prismaAdoption.message,
      prismaAdoption.notes,
      prismaAdoption.adopterProfileId,
    );
  }

  static toPersistence(application: AdoptionApplication): PrismaAdoption {
    return {
      id: application.id,
      status: application.status as unknown as PrismaAdoptionStatus,
      message: application.message || null,
      notes: application.notes || null,
      createdAt: application.createdAt,
      updatedAt: application.updatedAt,
      petId: application.petId,
      userId: application.userId,
      adopterProfileId: application.adopterProfileId || null,
    };
  }
}
