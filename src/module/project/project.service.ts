import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { ProjectDto } from './project.dto';
import Helpers from 'src/common/helpers/helpers.helper';
import { NotFoundException } from '@nestjs/common';
import { Status } from '../status/status.entity';
import { Query } from 'express-serve-static-core';

export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepo: Repository<Project>,
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
  ) {}

  async create(projectDto: ProjectDto): Promise<Project> {
    const project = await this.projectRepo.save(projectDto);
    return Helpers.sendCreated(project, 'Project created successfully.');
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.projectRepo.find({
      where: { id },
      relations: { status: true },
    });
    return Helpers.sendOk(project);
  }

  // async findAll(query: Query): Promise<Project[]> {
  //   const project = await this.projectRepo.find({
  //     order: { projectName: 'ASC' },
  //     relations: { status: true },
  //   });

  //   const keyword = query.keyword
  //     ? {
  //         title: {
  //           $regx: query.keyword,
  //           $options: 'i',
  //         },
  //       }
  //     : {};
  //   return Helpers.sendOk(project);
  // }

  async findAll(query: Query): Promise<Project[]> {
    const resPerPage = 4;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);
    const keyword: FindOptionsWhere<Project> = query.keyword
      ? {
          projectName: ILike(`%${query.keyword}%`),
        }
      : {};

    const projects = await this.projectRepo.find({
      where: keyword,
      take: resPerPage,
      skip: skip,
      relations: { status: true },
    });
    return Helpers.sendOk(projects);
  }

  async remove(id: string) {
    const existingProject = await this.projectRepo
      .delete({ id: id })
      .catch((err) => {
        throw new NotFoundException();
      });
    return Helpers.sendOk(existingProject, 'Project deleted successfully.');
  }

  async update(id: string, projectDto: ProjectDto): Promise<Project> {
    const existingProject = await this.projectRepo.findOne({
      where: { id: id },
    });
    if (!existingProject) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    Object.assign(existingProject, projectDto);
    const project = await this.projectRepo.save(existingProject);
    return Helpers.sendUpated(project);
  }

  async updateStatus(projectId: string, statusId: string): Promise<Project> {
    const project = await this.projectRepo.findOne({
      where: { id: projectId },
    });
    if (!project) {
      throw new Error('Project not found');
    }
    const status = await this.statusRepository.findOne({
      where: { id: statusId },
    });
    if (!status) {
      throw new Error('Status not found');
    }
    project.status = status;
    return this.projectRepo.save(project);
  }

  async countStatuses() {
    console.log('APIPIPIP');
    const statuses = await this.statusRepository.find();
    console.log('Statuses:', statuses); // Log statuses

    const statusCounts = await Promise.all(
      statuses.map(async (status) => {
        const count = await this.projectRepo.count({
          where: { status: { id: status.id } },
        });
        return { status: status.name, count };
      }),
    );

    console.log('Status Counts:', statusCounts); // Log status counts

    const totalProjects = await this.projectRepo.count();
    console.log('Total Projects:', totalProjects); // Log total projects

    return {
      statusCounts,
      totalProjects,
    };
  }
}
