import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import cookieParser from 'cookie-parser';

const developerDocumentation = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Adopta-pe API')
    .setDescription(
      'REST API for the pet adoption platform. Includes authentication, user management, pet listings, and adoption applications.',
    )
    .setVersion('1.0')
    .addTag('auth', 'Authentication endpoints')
    .addTag('users', 'User management')
    .addTag('pets', 'Pet listings and management')
    .addTag('adoptions', 'Adoption applications')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory());
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configure CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:4000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  if (process.env.NODE_ENV !== 'production') {
    developerDocumentation(app);
  }
  app.use(cookieParser()); // so now all the routes need to have access to cookies
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((err) => {
  console.error('❌ Error during bootstrap:', err);
  process.exit(1);
});
