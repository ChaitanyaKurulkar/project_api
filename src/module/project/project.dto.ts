import {IsOptional } from 'class-validator';
import { Status } from '../status/status.entity';

export class ProjectDto {
  @IsOptional()
  projectName: string;

  @IsOptional()
  reason: string;

  @IsOptional()
  type: string;

  @IsOptional()
  division: string;

  @IsOptional()
  category: string;

  @IsOptional()
  priority: string;

  @IsOptional()
  department: string;

  @IsOptional()
  startDate: string;

  @IsOptional()
  endDate: string;

  @IsOptional()
  location: string;

  @IsOptional()
  status: Status;
}
