import { Injectable } from '@nestjs/common';
import { StoryRepository } from '../../domain/repositories/story.repository';
import { Story } from '../../domain/entities/story.entity';

@Injectable()
export class GetUserStoriesUseCase {
  constructor(private readonly storyRepository: StoryRepository) {}

  async execute(userId: string): Promise<Story[]> {
    return this.storyRepository.findByUserId(userId);
  }
}
