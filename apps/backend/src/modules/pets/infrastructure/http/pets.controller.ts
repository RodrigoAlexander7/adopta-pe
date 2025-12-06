import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { CreatePetUseCase } from '../../application/use-cases/create-pet.use-case';
import { FindAllPetsUseCase } from '../../application/use-cases/find-all-pets.use-case';
import { FindPetByIdUseCase } from '../../application/use-cases/find-pet-by-id.use-case';
import { PetSpecies, Gender, PetSize } from '../../domain/entities/pet.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiProperty, ApiQuery } from '@nestjs/swagger';

// DTOs should ideally be in a separate file
class CreatePetDto {
  @ApiProperty({ description: 'Pet name', example: 'Max' })
  name: string;

  @ApiProperty({ enum: PetSpecies, description: 'Pet species', example: 'DOG' })
  species: PetSpecies;

  @ApiProperty({ enum: Gender, description: 'Pet gender', example: 'MALE' })
  gender: Gender;

  @ApiProperty({ enum: PetSize, description: 'Pet size', example: 'MEDIUM' })
  size: PetSize;

  @ApiProperty({ description: 'Shelter ID', example: 'uuid-string' })
  shelterId: string;

  @ApiProperty({ type: [String], required: false, description: 'Array of image URLs' })
  images?: string[];

  @ApiProperty({ required: false, description: 'Pet breed', example: 'Golden Retriever' })
  breed?: string;

  @ApiProperty({ required: false, description: 'Pet age', example: 3 })
  age?: number;

  @ApiProperty({ required: false, description: 'Pet color', example: 'Golden' })
  color?: string;

  @ApiProperty({ required: false, description: 'Pet description' })
  description?: string;

  @ApiProperty({ required: false, description: 'Health information' })
  healthInfo?: string;
}

@ApiTags('pets')
@Controller('pets')
export class PetsController {
  constructor(
    private readonly createPetUseCase: CreatePetUseCase,
    private readonly findAllPetsUseCase: FindAllPetsUseCase,
    private readonly findPetByIdUseCase: FindPetByIdUseCase,
  ) {}

  @ApiOperation({ summary: 'Create a new pet listing' })
  @ApiResponse({ status: 201, description: 'Pet created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @Post()
  async create(@Body() createPetDto: CreatePetDto) {
    // ToDo: Validate shelterId belongs to user or is admin.
    return this.createPetUseCase.execute(createPetDto);
  }

  @ApiOperation({ summary: 'Get all pets with optional filters' })
  @ApiResponse({ status: 200, description: 'Returns array of pets' })
  @ApiQuery({ name: 'species', required: false, enum: PetSpecies })
  @ApiQuery({ name: 'size', required: false, enum: PetSize })
  @ApiQuery({ name: 'isAdopted', required: false, type: Boolean })
  @Get()
  async findAll(@Query() query: any) {
    return this.findAllPetsUseCase.execute(query);
  }

  @ApiOperation({ summary: 'Get pet details by ID' })
  @ApiResponse({ status: 200, description: 'Returns pet details' })
  @ApiResponse({ status: 404, description: 'Pet not found' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.findPetByIdUseCase.execute(id);
  }
}
