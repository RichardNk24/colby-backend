import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  // Create the app
  const app = await NestFactory.create(AppModule);

  // Enable CORS for specific origins
  app.enableCors({
    origin: ['http://localhost:4200', 'https://yourdomain.com'], // Set allowed origins
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    credentials: true,
  });

  // Retrieve configuration variables
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  // Enable global validation with sanitization
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove extra properties
      forbidNonWhitelisted: true, // Throw an error on extra properties
      transform: true, // Automatically transform payloads to be objects typed according to their DTO classes
    }),
  );

  // Swagger setup for API documentation
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Colby Backend API')
    .setDescription('API documentation for the Colby backend')
    .setVersion('1.0')
    .addTag('colby')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document); // Route for API documentation

  // Start the application
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
