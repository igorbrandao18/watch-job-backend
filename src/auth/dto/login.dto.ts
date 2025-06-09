import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'user@email.com', description: 'E-mail do usuário' })
  email: string;

  @ApiProperty({ example: '123456', description: 'Senha do usuário' })
  password: string;
} 