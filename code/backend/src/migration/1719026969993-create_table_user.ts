import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserTable1634652200000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE public."user" (
            id SERIAL PRIMARY KEY,
            name character varying(255) NOT NULL,
            email character varying(255) NOT NULL,
            login character varying(100) NOT NULL,
            password text NOT NULL,
            CONSTRAINT user_email_key UNIQUE (email),
            CONSTRAINT user_login_key UNIQUE (login)
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }
}
