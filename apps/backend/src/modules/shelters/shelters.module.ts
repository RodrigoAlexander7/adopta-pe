import { Module } from '@nestjs/common';
import { SheltersController } from './infrastructure/http/shelters.controller';
import { CreateShelterUseCase } from './application/use-cases/create-shelter.use-case';
import { FindAllSheltersUseCase } from './application/use-cases/find-all-shelters.use-case';
import { ShelterRepository } from './domain/repositories/shelter.repository';
import { PrismaShelterRepository } from './infrastructure/persistence/prisma-shelter.repository';
import { PrismaModule } from '@/shared/infrastructure/persistence/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SheltersController],
  providers: [
    CreateShelterUseCase,
    FindAllSheltersUseCase,
    {
       provide: ShelterRepository,
       useClass: PrismaShelterRepository
    }
  ],
})
export class SheltersModule {}
