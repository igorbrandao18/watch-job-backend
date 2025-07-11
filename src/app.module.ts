import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MoviesModule } from './movies/movies.module';
import { ObservabilityModule } from './observability/observability.module';
import { MessagingModule } from './messaging/messaging.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [AuthModule, UserModule, MoviesModule, ObservabilityModule, MessagingModule, HealthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
