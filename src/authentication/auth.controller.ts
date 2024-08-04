import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from './user_login.dto';
import { Public } from 'src/common/decorator/public.decorator';
import { UserDto } from 'src/module/user/user.dto';
import { RefreshTokenDto } from 'src/module/token/token.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async registration(@Body() dto: UserDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: UserLoginDto) {
    return await this.authService.login(dto);
  }

  @Post('logout')
  async logout(@Body('id') id: string) {
    return await this.authService.logout(id);
  }

  @Post('refresh')
  async refreshToken(@Body() refreshTokendto :RefreshTokenDto){
    return this.authService.refreshToken(refreshTokendto.refreshToken)
  }
}
