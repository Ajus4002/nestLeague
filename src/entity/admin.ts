import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user';
@Entity()
export class Admins {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
