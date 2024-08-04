import { Injectable } from '@nestjs/common';
import { Status } from './status.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../project/project.entity';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
    @InjectRepository(Project)
    private projectRepo: Repository<Project>,
  ) {}

  async findAll(): Promise<Status[]> {
    return this.statusRepository.find();
  }

  async countStatuses() {
    const statuses = await this.statusRepository.find();

    const statusCounts = await Promise.all(
      statuses.map(async (status) => {
        const count = await this.projectRepo.count({
          where: { status: { id: status.id } },
        });
        return { status: status.name, count };
      }),
    );

    const totalProjects = await this.projectRepo.count();

    return {
      statusCounts,
      totalProjects,
    };
  }

  async countDepartments() {
    // Retrieve distinct departments
    const departments = await this.projectRepo
      .createQueryBuilder('project')
      .select('DISTINCT(project.department)', 'department')
      .getRawMany();

    // Count total and closed projects per department
    const departmentCounts = await Promise.all(
      departments.map(async (dept) => {
        const total = await this.projectRepo.count({
          where: { department: dept.department },
        });
        const closed = await this.projectRepo.count({
          where: {
            department: dept.department,
            status: { name: 'Closed' },
          },
        });
        return { department: dept.department, total, closed };
      }),
    );

    const totalProjects = await this.projectRepo.count();

    return {
      departmentCounts,
      totalProjects,
    };
  }
}
