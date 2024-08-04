import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from '../status/status.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  projectName: string;

  @Column({ nullable: true })
  reason: string;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  division: string;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true })
  priority: string;

  @Column({ nullable: true })
  department: string;

  @Column({ nullable: true })
  startDate: string;

  @Column({ nullable: true })
  endDate: string;

  @Column({ nullable: true })
  location: string;

  @ManyToOne(() => Status, (status) => status.projects, { nullable: true })
  status: Status;
}
