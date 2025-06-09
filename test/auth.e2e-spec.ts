import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaClient } from '@prisma/client';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaClient;

  beforeAll(async () => {
    prisma = new PrismaClient();
    await prisma.user.deleteMany();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
    await prisma.$disconnect();
    await app.close();
  });

  it('/auth/register (POST) deve registrar usuário', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: 'e2e@teste.com', password: '123456', name: 'E2E' })
      .expect(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.email).toBe('e2e@teste.com');
  });

  it('/auth/login (POST) deve logar e retornar token', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'e2e@teste.com', password: '123456' })
      .expect(201);
    expect(res.body).toHaveProperty('access_token');
    expect(typeof res.body.access_token).toBe('string');
  });

  it('/auth/login (POST) não deve logar com senha errada', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'e2e@teste.com', password: 'errada' })
      .expect(401);
  });
}); 