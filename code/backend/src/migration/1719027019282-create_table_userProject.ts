import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateUserProjectTable1634652300000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE public."userProject" (
            id SERIAL PRIMARY KEY,
            "fkUserId" integer NOT NULL,
            "fkProjectId" integer NOT NULL,
            CONSTRAINT "userProject_fkProjectId_fkey" FOREIGN KEY ("fkProjectId") REFERENCES public.project(id),
            CONSTRAINT "userProject_fkUserId_fkey" FOREIGN KEY ("fkUserId") REFERENCES public."user"(id)
        );
`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('userProject');
  }
}
