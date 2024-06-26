import { Project } from 'src/project/entities/project.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('task')
// @Unique(['name', 'fkProjectId'])
export class Task {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  dueDate: string;

  @Column({ default: false })
  done: boolean;

  @Column({ nullable: true })
  finishedDate: string;

  @ManyToOne(() => Project)
  @JoinColumn({ name: 'fkProjectId' })
  project: Project;
}
