import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, PrismaHealthIndicator, HealthCheckResult } from '@nestjs/terminus';
import { PrismaClient } from '@prisma/client';

@Controller('health')
export class HealthController {
  private prismaClient = new PrismaClient();
  constructor(
    private health: HealthCheckService,
    private prisma: PrismaHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  async check(): Promise<HealthCheckResult> {
    return this.health.check([
      async () => this.prisma.pingCheck('db', this.prismaClient),
      async () => ({ custom_metric: { status: 'up', value: 42 } }),
    ]);
  }
}
