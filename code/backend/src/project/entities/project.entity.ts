import { Task } from 'src/task/entities/task.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('project')
export class Project {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column()
  startDate: string;

  @ManyToMany(() => User)
  @JoinTable({
    name: 'userProject',
    inverseJoinColumn: { name: 'fkUserId', referencedColumnName: 'id' },
    joinColumn: { name: 'fkProjectId', referencedColumnName: 'id' },
  })
  users: User[];

  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];
}
