import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private prisma = new PrismaClient();

  async findAll() {
    return this.prisma.user.findMany({ select: { id: true, email: true, name: true, createdAt: true, updatedAt: true } });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id }, select: { id: true, email: true, name: true, createdAt: true, updatedAt: true } });
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }

  async update(id: number, data: UpdateUserDto) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    try {
      return await this.prisma.user.update({
        where: { id },
        data,
        select: { id: true, email: true, name: true, createdAt: true, updatedAt: true },
      });
    } catch {
      throw new NotFoundException('Usuário não encontrado');
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.user.delete({ where: { id } });
      return { message: 'Usuário removido com sucesso' };
    } catch {
      throw new NotFoundException('Usuário não encontrado');
    }
  }
}
