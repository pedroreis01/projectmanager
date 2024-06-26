import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
  TableUnique,
} from 'typeorm';

export class CreateTaskTable1634652100000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE public.task (
            id SERIAL PRIMARY KEY,
            name character varying(255) NOT NULL,
            description character varying(255) NOT NULL,
            "dueDate" date NOT NULL,
            "fkProjectId" integer NOT NULL,
            done boolean DEFAULT false,
            "finishedDate" date,
            CONSTRAINT unique_name_per_project_task UNIQUE (name, "fkProjectId"),
            CONSTRAINT "task_fkProjectId_fkey" FOREIGN KEY ("fkProjectId") REFERENCES public.project(id)
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('task');
  }
}
