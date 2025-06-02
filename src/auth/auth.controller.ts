import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { RegisterUserDTO } from 'src/auth/dto/registerUser.dto';
import { Public } from 'src/common/decorators/public';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Registrar novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário cadastrado com sucesso' })
  @ApiResponse({ status: 400, description: 'Email já existe' })
  async registerUser(@Body() registerUserDTO: RegisterUserDTO): Promise<string> {
    return await this.authService.registerUser(registerUserDTO);
  }

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Realizar login' })
  @ApiResponse({ 
    status: 200, 
    description: 'Login realizado com sucesso',
    schema: {
      type: 'object',
      properties: {
        accessToken: {
          type: 'string',
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Email ou senha inválida' })
  async Login(@Body() loginDTO: LoginDTO): Promise<{ accessToken: string }> {
    return await this.authService.login(loginDTO);
  }
}