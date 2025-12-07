import { Controller, Get, Post, Body, Request, UseGuards, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiProperty, ApiBearerAuth } from '@nestjs/swagger';
import { CreateStoryUseCase } from '../../application/use-cases/create-story.use-case';
import { FindAllStoriesUseCase } from '../../application/use-cases/find-all-stories.use-case';
import { GetUserStoriesUseCase } from '../../application/use-cases/get-user-stories.use-case';

class CreateStoryDto {
  @ApiProperty({ description: 'Story title', example: 'My Happy Adoption' })
  title: string;

  @ApiProperty({ description: 'Story content', example: 'We adopted Max and he changed our lives...' })
  content: string;

  @ApiProperty({ required: false, description: 'Image URL' })
  image?: string;
}

@ApiTags('stories')
@Controller('stories')
export class StoriesController {
  constructor(
    private readonly createStoryUseCase: CreateStoryUseCase,
    private readonly findAllStoriesUseCase: FindAllStoriesUseCase,
    private readonly getUserStoriesUseCase: GetUserStoriesUseCase,
  ) {}

  @ApiOperation({ summary: 'Create a new success story' })
  @ApiResponse({ status: 201, description: 'Story created' })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Request() req, @Body() dto: CreateStoryDto) {
    return this.createStoryUseCase.execute({
      ...dto,
      userId: req.user.userId,
    });
  }

  @ApiOperation({ summary: 'Get all stories' })
  @Get()
  async findAll() {
    return this.findAllStoriesUseCase.execute();
  }

  @ApiOperation({ summary: 'Get current user stories' })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getMyStories(@Request() req) {
    return this.getUserStoriesUseCase.execute(req.user.userId);
  }
}
