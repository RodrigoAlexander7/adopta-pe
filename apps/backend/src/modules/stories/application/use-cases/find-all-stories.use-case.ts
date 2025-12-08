import { Injectable } from '@nestjs/common';
import { StoryRepository } from '../../domain/repositories/story.repository';
import { Story } from '../../domain/entities/story.entity';

@Injectable()
export class FindAllStoriesUseCase {
  constructor(private readonly storyRepository: StoryRepository) {}

  async execute(): Promise<Story[]> {
    return this.storyRepository.findAll();
  }
}
