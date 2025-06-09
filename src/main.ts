import '../otel-bootstrap';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './observability/logger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { logger: WinstonModule.createLogger(winstonConfig) },
  );
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
