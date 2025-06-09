import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário registrado com sucesso', schema: { example: { id: 1, email: 'user@email.com', name: 'João da Silva' } } })
  @ApiResponse({ status: 409, description: 'E-mail já cadastrado' })
  async register(@Body() data: RegisterDto) {
    return this.authService.register(data);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login do usuário' })
  @ApiResponse({ status: 201, description: 'Login bem-sucedido', schema: { example: { access_token: 'jwt.token.aqui' } } })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  async login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }
}
