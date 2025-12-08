import { Controller, Post, Get, Body, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateAdoptionApplicationUseCase } from '../../application/use-cases/create-adoption-application.use-case';
import { GetUserAdoptionsUseCase } from '../../application/use-cases/get-user-adoptions.use-case';
import { ApiTags, ApiOperation, ApiResponse, ApiProperty, ApiBearerAuth } from '@nestjs/swagger';

class CreateAdoptionRequest {
  @ApiProperty({ description: 'Pet ID to adopt', example: 'uuid-string' })
  petId: string;

  @ApiProperty({ required: false, description: 'Optional message to shelter', example: 'I would love to adopt this pet!' })
  message?: string;
}

@ApiTags('adoptions')
@Controller('adoptions')
export class AdoptionsController {
  constructor(
    private readonly createAdoptionUseCase: CreateAdoptionApplicationUseCase,
    private readonly getUserAdoptionsUseCase: GetUserAdoptionsUseCase,
  ) {}

  @ApiOperation({ summary: 'Submit an adoption application' })
  @ApiResponse({ status: 201, description: 'Adoption application created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 401, description: 'Unauthorized - User must be logged in' })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Request() req, @Body() dto: CreateAdoptionRequest) {
    const userId = req.user.userId;
    return this.createAdoptionUseCase.execute({
        ...dto,
        userId,
    });
  }

  @ApiOperation({ summary: 'Get current user adoption applications' })
  @ApiResponse({ status: 200, description: 'Returns array of user adoption applications' })
  @ApiResponse({ status: 401, description: 'Unauthorized - User must be logged in' })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getMyAdoptions(@Request() req) {
    const userId = req.user.userId;
    return this.getUserAdoptionsUseCase.execute(userId);
  }
}
