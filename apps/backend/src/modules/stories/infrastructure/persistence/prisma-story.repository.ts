import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/shared/infrastructure/persistence/prisma/prisma.service';
import { StoryRepository } from '../../domain/repositories/story.repository';
import { Story } from '../../domain/entities/story.entity';
import { StoryMapper } from './story.mapper';

@Injectable()
export class PrismaStoryRepository implements StoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(story: Story): Promise<void> {
    const data = StoryMapper.toPersistence(story);
    await this.prisma.client.story.create({ data });
  }

  async findAll(): Promise<Story[]> {
    const stories = await this.prisma.client.story.findMany({
      include: { user: true },
      orderBy: { createdAt: 'desc' },
    });
    return stories.map(StoryMapper.toDomain);
  }

  async findByUserId(userId: string): Promise<Story[]> {
    const stories = await this.prisma.client.story.findMany({
      where: { userId },
      include: { user: true },
      orderBy: { createdAt: 'desc' },
    });
    return stories.map(StoryMapper.toDomain);
  }
}
