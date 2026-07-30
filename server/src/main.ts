import helmet from 'helmet';
import morgan from 'morgan';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { AppModule } from './app.module';

async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  morgan.token('user', (req) => req['user']?.nick ?? '-');
  morgan.token('body', (req) => {
    const body = { ...req['body'] };
    delete body.password;
    delete body.oldPassword;
    delete body.newPassword;
    return JSON.stringify(body);
  });
  app.use(
    morgan(
      ':user :method :url :status :res[content-length] - :response-time ms :body',
    ),
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
