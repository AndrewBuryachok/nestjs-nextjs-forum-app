import helmet from 'helmet';
import morgan from 'morgan';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { AppModule } from './app.module';

async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.use((req, res, next) => {
    const originalJson = res.json.bind(res);
    res.json = (body) => {
      res.locals.body = body;
      return originalJson(body);
    };
    next();
  });
  morgan.token('user', (req) => req['user']?.nick ?? '-');
  morgan.token('body', (req) => {
    const body = { ...req['body'] };
    delete body.password;
    delete body.oldPassword;
    delete body.newPassword;
    return JSON.stringify(body);
  });
  morgan.token('result', (req, res) => {
    const body = res['locals'].body;
    if (!body) {
      return '-';
    }
    if (Array.isArray(body)) {
      return `{length:${body.length}}`;
    }
    if (typeof body === 'object') {
      if ('data' in body && 'total' in body) {
        return `{data:${body.data.length},total:${body.total}}`;
      }
      if ('message' in body) {
        return `{error:${body.message}}`;
      }
    }
    return '?';
  });
  app.use(
    morgan(
      ':user :method :url :status :res[content-length] - :response-time ms :body :result',
    ),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  const configService = app.get(ConfigService);
  const config = new DocumentBuilder()
    .setTitle('Forum API')
    .setDescription('Forum API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(+configService.getOrThrow('PORT'));
}
bootstrap();
