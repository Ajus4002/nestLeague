import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Role } from '../app/authentication/auth.dto';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ type: 'enum', enum: Role })
  role: Role;

  @Column({ type: 'enum', enum: ['Approve', 'Reject'] })
  status: 'Approve' | 'Reject';
  @Column()
  isActive: boolean;

  @Column({ nullable: true })
  fgToken: string;
}
