import { Controller, Get, Param, Put, Delete, Body, UseGuards, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@UseGuards(AuthGuard('jwt'))
@ApiTags('Usuários')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os usuários' })
  @ApiResponse({ status: 200, description: 'Lista de usuários', schema: { example: [ { id: 1, email: 'user@email.com', name: 'João da Silva', createdAt: '2024-06-10T12:00:00Z', updatedAt: '2024-06-10T12:00:00Z' } ] } })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detalhar usuário por ID' })
  @ApiResponse({ status: 200, description: 'Usuário encontrado', schema: { example: { id: 1, email: 'user@email.com', name: 'João da Silva', createdAt: '2024-06-10T12:00:00Z', updatedAt: '2024-06-10T12:00:00Z' } } })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar usuário por ID' })
  @ApiResponse({ status: 200, description: 'Usuário atualizado', schema: { example: { id: 1, email: 'user@email.com', name: 'Novo Nome', createdAt: '2024-06-10T12:00:00Z', updatedAt: '2024-06-10T12:10:00Z' } } })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateUserDto) {
    return this.userService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover usuário por ID' })
  @ApiResponse({ status: 200, description: 'Usuário removido', schema: { example: { message: 'Usuário removido com sucesso' } } })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
