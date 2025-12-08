import { Story as PrismaStory, User } from '@generated/prisma/client';
import { Story } from '../../domain/entities/story.entity';

type PrismaStoryWithUser = PrismaStory & { user: User };

export class StoryMapper {
  static toDomain(prismaStory: PrismaStoryWithUser | PrismaStory): Story {
    const authorName = (prismaStory as PrismaStoryWithUser).user?.name;
    
    return new Story(
      prismaStory.id,
      prismaStory.title,
      prismaStory.content,
      prismaStory.userId,
      prismaStory.createdAt,
      prismaStory.image,
      authorName
    );
  }

  static toPersistence(story: Story): PrismaStory {
    return {
      id: story.id,
      title: story.title,
      content: story.content,
      image: story.image || null,
      userId: story.userId,
      createdAt: story.createdAt,
      updatedAt: new Date(), // updated automatically by Prisma usually, but required by type
    };
  }
}
