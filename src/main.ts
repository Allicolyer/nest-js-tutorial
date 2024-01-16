import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Apply the ValidationPipe globally in our main.ts file
  app.useGlobalPipes(
    new ValidationPipe({
      // The whitelist option strips away parameters that aren't specifically part of the dto model. Can help protect against malicious behavior.
      whitelist: true,
      // Rejects requests that have unwanted key values
      forbidNonWhitelisted: true,
      // Performs primitive type conversion. Automaticlly converst he payload to the DTO
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
