import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { ConflictException, UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaClient;

  beforeAll(async () => {
    prisma = new PrismaClient();
    await prisma.user.deleteMany(); // Limpa usuários antes dos testes
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useFactory: () =>
            new JwtService({
              secret: process.env.JWT_SECRET || 'changeme',
              signOptions: { expiresIn: '1d' },
            }),
        },
      ],
    }).compile();
    service = module.get<AuthService>(AuthService);
  });

  it('deve registrar um novo usuário', async () => {
    const data = { email: 'unit@teste.com', password: '123456', name: 'Unit' };
    const user = await service.register(data);
    expect(user).toHaveProperty('id');
    expect(user.email).toBe(data.email);
    expect(user.name).toBe(data.name);
  });

  it('não deve registrar usuário com email duplicado', async () => {
    const data = { email: 'unit@teste.com', password: '123456', name: 'Unit' };
    await expect(service.register(data)).rejects.toThrow(ConflictException);
  });

  it('deve logar com credenciais válidas', async () => {
    const data = { email: 'unit@teste.com', password: '123456' };
    const result = await service.login(data);
    expect(result).toHaveProperty('access_token');
    expect(typeof result.access_token).toBe('string');
  });

  it('não deve logar com senha errada', async () => {
    const data = { email: 'unit@teste.com', password: 'errada' };
    await expect(service.login(data)).rejects.toThrow(UnauthorizedException);
  });

  it('não deve logar com email inexistente', async () => {
    const data = { email: 'naoexiste@teste.com', password: '123456' };
    await expect(service.login(data)).rejects.toThrow(UnauthorizedException);
  });
});
