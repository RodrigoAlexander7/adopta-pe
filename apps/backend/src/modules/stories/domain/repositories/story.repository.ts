import { Story } from '../entities/story.entity';

export abstract class StoryRepository {
  abstract create(story: Story): Promise<void>;
  abstract findAll(): Promise<Story[]>;
  abstract findByUserId(userId: string): Promise<Story[]>;
}
