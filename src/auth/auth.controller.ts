import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthResponseDto } from './auth.dto'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Login do usuário' })
    @ApiResponse({ status: 200, description: 'Login realizado com sucesso' })
    @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
    @Post('login')
    signIn(
        @Body('email') email: string,
        @Body('password') password: string
    ): Promise<AuthResponseDto> {
        console.log('controller', email, password)
        return this.authService.signIn(email, password);
    }
    
}
