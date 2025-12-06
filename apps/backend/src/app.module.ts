import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { AuthModule } from '@/auth/auth.module';
import { PetsModule } from '@/modules/pets/pets.module';
import { AdoptionsModule } from '@/modules/adoptions/adoptions.module';
import { UsersModule } from '@/modules/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '@/shared/infrastructure/persistence/prisma/prisma.module';

import { validationSchema } from './configs/validations';
import configuration from './configs/configuration';

@Module({
  // Imports are allways modules, not services
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
      load: [configuration]
    }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('authSecret'),
        global: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    PetsModule,
    AdoptionsModule,
    AuthModule,
    PrismaModule,
  ],
  controllers: [AppController],
  // Services by the module it self (no from other module)
  providers: [AppService],
})
export class AppModule { }
