import { Module } from '@nestjs/common';
import { AdoptionsController } from './infrastructure/http/adoptions.controller';
import { CreateAdoptionApplicationUseCase } from './application/use-cases/create-adoption-application.use-case';
import { GetUserAdoptionsUseCase } from './application/use-cases/get-user-adoptions.use-case';
import { AdoptionRepository } from './domain/repositories/adoption.repository';
import { PrismaAdoptionRepository } from './infrastructure/persistence/prisma-adoption.repository';
import { PrismaModule } from '@/shared/infrastructure/persistence/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AdoptionsController],
  providers: [
    CreateAdoptionApplicationUseCase,
    GetUserAdoptionsUseCase,
    {
      provide: AdoptionRepository,
      useClass: PrismaAdoptionRepository,
    },
  ],
})
export class AdoptionsModule {}
