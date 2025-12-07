import { Module } from '@nestjs/common';
import { StoriesController } from './infrastructure/http/stories.controller';
import { CreateStoryUseCase } from './application/use-cases/create-story.use-case';
import { FindAllStoriesUseCase } from './application/use-cases/find-all-stories.use-case';
import { GetUserStoriesUseCase } from './application/use-cases/get-user-stories.use-case';
import { StoryRepository } from './domain/repositories/story.repository';
import { PrismaStoryRepository } from './infrastructure/persistence/prisma-story.repository';
import { PrismaModule } from '@/shared/infrastructure/persistence/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [StoriesController],
  providers: [
    CreateStoryUseCase,
    FindAllStoriesUseCase,
    GetUserStoriesUseCase,
    {
      provide: StoryRepository,
      useClass: PrismaStoryRepository,
    },
  ],
})
export class StoriesModule {}
