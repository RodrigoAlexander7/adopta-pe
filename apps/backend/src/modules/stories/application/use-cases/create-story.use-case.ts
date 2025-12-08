import { Injectable } from '@nestjs/common';
import { StoryRepository } from '../../domain/repositories/story.repository';
import { Story } from '../../domain/entities/story.entity';
import { v4 as uuidv4 } from 'uuid';

interface CreateStoryDto {
  title: string;
  content: string;
  image?: string;
  userId: string;
}

@Injectable()
export class CreateStoryUseCase {
  constructor(private readonly storyRepository: StoryRepository) {}

  async execute(dto: CreateStoryDto): Promise<Story> {
    const story = new Story(
      uuidv4(),
      dto.title,
      dto.content,
      dto.userId,
      new Date(),
      dto.image,
    );

    await this.storyRepository.create(story);
    return story;
  }
}
