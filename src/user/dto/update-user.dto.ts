import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'Novo Nome', description: 'Nome do usuário' })
  name?: string;

  @ApiPropertyOptional({ example: 'novasenha123', description: 'Nova senha do usuário' })
  password?: string;
} 