import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/common/decorator/public.decorator';
import { StatusService } from './status.service';

@Controller()
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get('status')
  async getStatuses() {
    return this.statusService.findAll();
  }

  @Get('status-count')
  async getStatusCount() {
    return this.statusService.countStatuses();
  }

  @Get('departments')
  async getDepartmentCounts() {
    return this.statusService.countDepartments();
  }
}
