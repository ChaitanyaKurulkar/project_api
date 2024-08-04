import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configuration } from './config/app/configuration';
import { validationSchema } from './config/app/validation_schema';
import { TypeOrmConfigService } from './config/database/mysql.service';
import { AuthModule } from './authentication/auth.module';
import { UserModule } from './module/user/user.module';
import { ProjectModule } from './module/project/project.module';
import { AppController } from './app.controller';
import { StatusModule } from './module/status/status.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/src/config/env/${process.env.APP_ENV}.env`,
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    AuthModule,
    UserModule,
    ProjectModule,
    StatusModule,
  ],
  controllers:[],
  providers: [],
})
export class AppModule {}
