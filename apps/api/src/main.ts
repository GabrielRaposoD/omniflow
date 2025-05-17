import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('OmniFlow API')
    .setDescription('OmniFlow API description')
    .setVersion('1.0')
    .addTag('omniflow')
    .addGlobalResponse({
      status: 400,
      description: 'Bad Request',
    })
    .addGlobalResponse({
      status: 401,
      description: 'Unauthorized',
    })
    .addGlobalResponse({
      status: 500,
      description: 'Internal server error',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);

  app.enableCors();
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
