import morgan from 'morgan';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  morgan.token('user', (req) => req['user']?.nick ?? '-');
  morgan.token('body', (req) => {
    const body = { ...req['body'] };
    delete body.password;
    return JSON.stringify(body);
  });
  app.use(
    morgan(
      ':user :method :url :status :res[content-length] - :response-time ms :body',
    ),
  );
  const configService = app.get(ConfigService);
  await app.listen(+configService.getOrThrow('PORT'));
}
bootstrap();
