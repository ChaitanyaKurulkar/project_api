import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { User } from '../user/user.entity';
  
  @Entity()
  export class Token {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ nullable: true })
    refreshToken: string;
  
    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: 'userId' })
    user: User;
  
    @Column({ nullable: true })
    expiryDate: Date;
  }
  