import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user';

@Entity()
export class LeagueApplication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  league_id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
