import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
   // Get current user profile
   @Get('me')
   @UseGuards(AuthGuard('jwt'))
   getProfile(@Request() req) {
      return req.user;
   }
}
