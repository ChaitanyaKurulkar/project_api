import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectDto } from './project.dto';
import { Project } from './project.entity';

import { Query as ExpressQuery } from 'express-serve-static-core';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async create(@Body() projectDto: ProjectDto) {
    return this.projectService.create(projectDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.projectService.findOne(id);
  }

  @Get()
  async findAll(@Query() query: ExpressQuery): Promise<Project[]> {
    return this.projectService.findAll(query);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.projectService.remove(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() projectDto: ProjectDto) {
    return this.projectService.update(id, projectDto);
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body('statusId') statusId: string,
  ) {
    return this.projectService.updateStatus(id, statusId);
  }
}
