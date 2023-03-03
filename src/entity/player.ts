import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user';

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  user_id: number;
  @Column()
  dateOfBirth: Date;

  @Column()
  height: number;

  @Column()
  club: string;

  @Column()
  school: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
