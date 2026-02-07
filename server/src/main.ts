import morgan from 'morgan';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  morgan.token('body', (req) => JSON.stringify(req['body']));
  app.use(
    morgan(
      ':method :url :status :res[content-length] - :response-time ms :body',
    ),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  const configService = app.get(ConfigService);
  await app.listen(+configService.getOrThrow('PORT'));
}
bootstrap();
