import { Controller, Post, Get, Body, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateAdoptionApplicationUseCase } from '../../application/use-cases/create-adoption-application.use-case';
import { GetUserAdoptionsUseCase } from '../../application/use-cases/get-user-adoptions.use-case';

class CreateAdoptionRequest {
  petId: string;
  message?: string;
}

@Controller('adoptions')
export class AdoptionsController {
  constructor(
    private readonly createAdoptionUseCase: CreateAdoptionApplicationUseCase,
    private readonly getUserAdoptionsUseCase: GetUserAdoptionsUseCase,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Request() req, @Body() dto: CreateAdoptionRequest) {
    const userId = req.user.id;
    return this.createAdoptionUseCase.execute({
        ...dto,
        userId,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getMyAdoptions(@Request() req) {
    const userId = req.user.id;
    return this.getUserAdoptionsUseCase.execute(userId);
  }
}
