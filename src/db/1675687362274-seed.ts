import { User } from '../entity/user';
import AppDataSource from '../typeOrm';
import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from '../app/authentication/auth.dto';

export class seed1675687362274 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const user = new User();
    user.email = 'admin@admin.com';
    user.firstName = 'Admin';
    user.lastName = 'Admin';
    user.role = Role.SuperAdmin;
    user.password = bcrypt.hashSync('123456', 10);
    user.status = 'Approve';
    user.isActive = true;
    user.phone = '0';

    await AppDataSource.getRepository(User).insert(user);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
