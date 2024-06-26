import { Project } from "src/project/entities/project.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    login: string;

    @Column({ select: false })
    password: string;

    @ManyToMany(() => Project)
    @JoinTable({
        name: 'userProject',
        joinColumn: { name: 'fkUserId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'fkProjectId', referencedColumnName: 'id' }
      })
    projects: Project[]
}
