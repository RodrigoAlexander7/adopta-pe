import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUserProfileUseCase } from '../../application/use-cases/get-user-profile.use-case';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
   constructor(private readonly getUserProfileUseCase: GetUserProfileUseCase) {}

   @ApiOperation({ summary: 'Get current user profile' })
   @ApiResponse({ status: 200, description: 'Returns full user profile from database' })
   @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or missing token' })
   @ApiResponse({ status: 404, description: 'User not found' })
   @ApiBearerAuth('JWT-auth')
   @Get('me')
   @UseGuards(AuthGuard('jwt'))
   async getProfile(@Request() req) {
      // req.user has { userId, email } from JwtStrategy
      return this.getUserProfileUseCase.execute(req.user.userId);
   }
}
