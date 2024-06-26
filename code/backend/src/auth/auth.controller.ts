//auth.controller.ts
import {
  Controller,
  Post,
  Body,
  HttpCode,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-auth.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('auth/signIn')
  // @HttpCode(200)
  async login(@Body() body: LoginUserDto) {
    const user = await this.authService.signIn(body.login, body.password);
    if (!user) throw new UnauthorizedException('Credenciais inválidas');
    return user;
  }
}
