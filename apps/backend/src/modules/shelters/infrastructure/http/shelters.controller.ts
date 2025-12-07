import { Controller, Get, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiProperty, ApiBearerAuth } from '@nestjs/swagger';
import { CreateShelterUseCase } from '../../application/use-cases/create-shelter.use-case';
import { FindAllSheltersUseCase } from '../../application/use-cases/find-all-shelters.use-case';

class CreateShelterDto {
  @ApiProperty({ example: 'Happy Paws Shelter' })
  name: string;
  @ApiProperty({ example: 'contact@happypaws.com' })
  email: string;
  @ApiProperty({ example: '123 Main St' })
  address: string;
  @ApiProperty({ example: 'Lima' })
  city: string;
  @ApiProperty({ required: false })
  description?: string;
}

@ApiTags('shelters')
@Controller('shelters')
export class SheltersController {
  constructor(
    private readonly createShelterUseCase: CreateShelterUseCase,
    private readonly findAllSheltersUseCase: FindAllSheltersUseCase,
  ) {}

  @ApiOperation({ summary: 'Register a new shelter' })
  @ApiResponse({ status: 201, description: 'Shelter registered successfully' })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Request() req, @Body() dto: CreateShelterDto) {
    return this.createShelterUseCase.execute({
      ...dto,
      userId: req.user.userId,
    });
  }

  @ApiOperation({ summary: 'List all shelters' })
  @Get()
  async findAll() {
    return this.findAllSheltersUseCase.execute();
  }
}
