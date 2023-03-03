import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from './entity/user';
import AppDataSource from './typeOrm';

export class db1675687192657 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {}

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
