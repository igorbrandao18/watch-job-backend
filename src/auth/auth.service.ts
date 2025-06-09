import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private prisma = new PrismaClient();
  constructor(private readonly jwtService: JwtService) {}

  async register(data: RegisterDto) {
    const userExists = await this.prisma.user.findUnique({ where: { email: data.email } });
    if (userExists) {
      throw new ConflictException('Email já cadastrado');
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
      },
    });
    return { id: user.id, email: user.email, name: user.name };
  }

  async login(data: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: data.email } });
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    const passwordValid = await bcrypt.compare(data.password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    const payload = { sub: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload);
    return { access_token: token };
  }
}
