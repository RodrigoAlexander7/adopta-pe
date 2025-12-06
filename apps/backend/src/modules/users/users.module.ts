import { Module } from '@nestjs/common';
import { UsersController } from './infrastructure/http/users.controller';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { FindUserByEmailUseCase } from './application/use-cases/find-user-by-email.use-case';
import { GetUserProfileUseCase } from './application/use-cases/get-user-profile.use-case';
import { UserRepository } from './domain/repositories/user.repository';
import { PrismaUserRepository } from './infrastructure/persistence/prisma-user.repository';
import { PrismaModule } from '@/shared/infrastructure/persistence/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [
    CreateUserUseCase,
    FindUserByEmailUseCase,
    GetUserProfileUseCase,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [CreateUserUseCase, FindUserByEmailUseCase],
})
export class UsersModule {}
