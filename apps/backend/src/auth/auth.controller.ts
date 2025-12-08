import { Controller, Res, Get, Request, UseGuards, Req } from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth') // all the routes under 'auth'
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) { }

  @ApiOperation({ summary: 'Initiate Google OAuth login' })
  @ApiResponse({ status: 302, description: 'Redirects to Google login page' })
  @UseGuards(AuthGuard('google'))
  @Get('google')
  async googleAuth() {
    return 'Google Auth';
  }

  @ApiOperation({ summary: 'Google OAuth callback' })
  @ApiResponse({ status: 302, description: 'Redirects to frontend with JWT token' })
  @ApiResponse({ status: 401, description: 'Authentication failed' })
  @UseGuards(AuthGuard('google'))
  @Get('google/callback')
  async googleAuthCallback(@Request() req, @Res() res) {
    const frontendUrl = this.configService.get<string>('frontendURL');

    try {
      const { accessToken } = await this.authService.callbackOauthGoogle(
        // this req is the one modified by passport with the user info -> see comments in google.strategy.ts
        req.user,
      );

      // redirect to frontend with the token
      res.redirect(
        `${frontendUrl}/api/auth/google/callback?token=${accessToken}`,
      );
    } catch (error) {
      console.error('Error during Google auth callback:', error);
      res.redirect(`${frontendUrl}/auth/error?message=${error.message}`);
    }
  }

  @ApiOperation({ summary: 'Get current authenticated user info from token' })
  @ApiResponse({ status: 200, description: 'Returns user info from JWT payload' })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or missing token' })
  @ApiBearerAuth('JWT-auth')
  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Request() req) {
    return req.user
  }

}
