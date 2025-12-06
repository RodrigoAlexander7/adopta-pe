import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { CreatePetUseCase } from '../../application/use-cases/create-pet.use-case';
import { FindAllPetsUseCase } from '../../application/use-cases/find-all-pets.use-case';
import { FindPetByIdUseCase } from '../../application/use-cases/find-pet-by-id.use-case';
import { PetSpecies, Gender, PetSize } from '../../domain/entities/pet.entity';

// DTOs should ideally be in a separate file
class CreatePetDto {
  name: string;
  species: PetSpecies;
  gender: Gender;
  size: PetSize;
  shelterId: string; // Should come from logged in user ideally, but for MVP maybe explicitly sent?
  images?: string[];
  breed?: string;
  age?: number;
  color?: string;
  description?: string;
  healthInfo?: string;
}

@Controller('pets')
export class PetsController {
  constructor(
    private readonly createPetUseCase: CreatePetUseCase,
    private readonly findAllPetsUseCase: FindAllPetsUseCase,
    private readonly findPetByIdUseCase: FindPetByIdUseCase,
  ) {}

  @Post()
  async create(@Body() createPetDto: CreatePetDto) {
    // ToDo: Validate shelterId belongs to user or is admin.
    return this.createPetUseCase.execute(createPetDto);
  }

  @Get()
  async findAll(@Query() query: any) {
    return this.findAllPetsUseCase.execute(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.findPetByIdUseCase.execute(id);
  }
}
