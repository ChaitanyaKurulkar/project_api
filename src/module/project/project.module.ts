import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { Status } from '../status/status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project , Status])],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
