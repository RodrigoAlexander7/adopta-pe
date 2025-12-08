import { Module } from '@nestjs/common';
import { PetsController } from './infrastructure/http/pets.controller';
import { CreatePetUseCase } from './application/use-cases/create-pet.use-case';
import { FindAllPetsUseCase } from './application/use-cases/find-all-pets.use-case';
import { FindPetByIdUseCase } from './application/use-cases/find-pet-by-id.use-case';
import { PetRepository } from './domain/repositories/pet.repository';
import { PrismaPetRepository } from './infrastructure/persistence/prisma-pet.repository';
import { PrismaModule } from '@/shared/infrastructure/persistence/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PetsController],
  providers: [
    CreatePetUseCase,
    FindAllPetsUseCase,
    FindPetByIdUseCase,
    {
      provide: PetRepository,
      useClass: PrismaPetRepository,
    },
  ],
  exports: [FindPetByIdUseCase] // Export if needed by other modules (e.g. adoptions)
})
export class PetsModule {}
