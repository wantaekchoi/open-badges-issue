import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

function setupOpenApi(app: INestApplication) {
  const document = new DocumentBuilder()
    .setTitle('Open Badges v2p0 Issue sample')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, document);
  SwaggerModule.setup('openapi', app, documentFactory);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose', 'fatal'],
  });

  setupOpenApi(app);

  await app.listen(3000);
}
bootstrap();
