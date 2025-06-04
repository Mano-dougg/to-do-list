import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DateTransformInterceptor } from './common/interceptors/dateTransform.interceptor';

dotenv.config();

async function bootstrap() {
  process.env.TZ = 'America/Sao_Paulo';

  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new DateTransformInterceptor());

  const config = new DocumentBuilder()
    .setTitle('ToDo List API')
    .setDescription('API para gerenciamento de tarefas')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
