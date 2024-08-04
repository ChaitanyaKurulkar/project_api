import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from 'src/config/database/database.module';
import { User } from 'src/module/user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/module/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { Token } from 'src/module/token/token.entity';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Token]),
    JwtModule.register({ global: true, secret: '123' }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    // { provide: APP_GUARD, useClass: AuthGuard },
  ],
})
export class AuthModule {}
