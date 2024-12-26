import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swagger } from './infrastructure/swagger.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  swagger(app);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT);
  console.log(
    `Application is running on: http://localhost:${process.env.PORT}/api`,
  );
}
bootstrap();
