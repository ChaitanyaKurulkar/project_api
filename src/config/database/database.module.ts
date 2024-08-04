import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './mysql.service';

@Module({
    imports: [TypeOrmModule.forRootAsync({
        useClass: TypeOrmConfigService,
      })],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
