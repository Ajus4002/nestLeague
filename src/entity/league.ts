import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user';
@Entity()
export class League {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  date: Date;

  @Column()
  timing: string;

  @Column({ nullable: true })
  details: string;

  @Column({ type: 'enum', enum: ['Approve', 'Reject'] })
  status: 'Approve' | 'Reject';

  @Column()
  isActive: boolean;
  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
