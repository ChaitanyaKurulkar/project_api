import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Status } from '../status/status.entity';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';
import { Project } from '../project/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Status , Project])],
  controllers: [StatusController],
  providers: [StatusService],
})
export class StatusModule {}
