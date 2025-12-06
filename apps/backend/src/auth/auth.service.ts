import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FindUserByEmailUseCase } from '@/modules/users/application/use-cases/find-user-by-email.use-case';
import { CreateUserUseCase } from '@/modules/users/application/use-cases/create-user.use-case';

@Injectable()
export class AuthService {
  // dependences injection
  constructor(
    private readonly jwtService: JwtService,
    private readonly findUserByEmailUseCase: FindUserByEmailUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  //we dont use access token nor refresh tken, we create our own jwt
  async callbackOauthGoogle({ name, email, image, accessToken, refreshToken }) {
    console.log('EMAIL RECIBIDO:', email);
    if (!email) throw new UnauthorizedException('Email not found from Google');

    let user = await this.findUserByEmailUseCase.execute(email);

    if (!user) {
      user = await this.createUserUseCase.execute({
        name,
        email,
        image,
      });
    }

    const payload = { sub: user.id, email: user.email };
    const jwt = this.jwtService.sign(payload);
    return { accessToken: jwt }; // return an JWT object
  }
}
