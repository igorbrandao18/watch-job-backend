import '../otel-bootstrap';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './observability/logger';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import '@fastify/swagger';
import '@fastify/swagger-ui';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { logger: WinstonModule.createLogger(winstonConfig) },
  );

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('WatchMe API')
    .setDescription('Documentação da API do WatchMe')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
