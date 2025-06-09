import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'user@email.com', description: 'E-mail do usuário' })
  email: string;

  @ApiProperty({ example: '123456', description: 'Senha do usuário' })
  password: string;

  @ApiProperty({ example: 'João da Silva', description: 'Nome do usuário' })
  name: string;
} 