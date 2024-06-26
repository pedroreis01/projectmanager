import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProjectTable1634652000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE public.project (
            id SERIAL PRIMARY KEY,
            name character varying(255) NOT NULL,
            description character varying(255) NOT NULL,
            "startDate" date NOT NULL,
            CONSTRAINT unique_name_project UNIQUE (name)
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('project');
  }
}
