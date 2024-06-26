import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { In, Not, Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly repository: Repository<Project>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  create(createProjectDto: CreateProjectDto) {
    const project = this.repository.create(createProjectDto);
    return this.repository.save(project);
  }

  async createWithUser(
    name: string,
    description: string,
    startDate: string,
    userId: number,
  ): Promise<Project> {
    // Cria um novo projeto
    const project = this.repository.create({
      name,
      description,
      startDate,
    });

    // Encontra o usuário pelo ID
    const user = await this.userRepository.findOneBy({ id: userId });

    // Se o usuário existe, adiciona o projeto a sua lista de projetos
    if (user) {
      project.users = [user];
      await this.repository.save(project);
      return project;
    } else {
      throw new NotFoundException(`Usuário não encontrado.`);
    }
  }

  async linkUsers(projectId: number, userIds: number[]): Promise<Project> {
    const project = await this.repository.findOne({
      where: {
        id: projectId,
      },
      relations: ['users'],
    });

    if (!project) {
      throw new NotFoundException(`Projeto não encontrado.`);
    }

    const users = await this.userRepository.findBy({
      id: In(userIds),
    });

    if (users.length !== userIds.length) {
      throw new NotFoundException('Um ou mais usuários não foram encontrados.');
    }

    let usersToLink = users;
    if (project.users && project.users.length > 0) {
      usersToLink = users.filter(
        (user) => !project.users.some((u) => u.id === user.id),
      );
      usersToLink.forEach((user) => {
        project.users.push(user);
      });
    } else {
      project.users.push(...users);
    }
    return this.repository.save(project);
  }

  async unlinkUsers(projectId: number, userIds: number[]): Promise<Project> {
    // Encontra o projeto pelo ID
    const project = await this.repository.findOne({
      where: {
        id: projectId,
      },
      relations: ['users'],
    });

    if (!project) {
      throw new NotFoundException('Projeto não encontrado.');
    }

    // Encontra os usuários pelos IDs
    const usersToRemove = await this.userRepository.find({
      where: {
        id: In(userIds),
      },
    });

    // Verifica se todos os usuários foram encontrados
    if (usersToRemove.length !== userIds.length) {
      throw new NotFoundException('Um ou mais usuários não foram encontrados.');
    }

    // Remove os usuários do projeto
    project.users = project.users.filter(
      (user) => !usersToRemove.some((u) => u.id === user.id),
    );

    return this.repository.save(project);
  }

  async findProjectsNotLinkedToUser(userId: number) {
    const projectIds = await this.repository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.users', 'user')
      .leftJoinAndSelect('project.tasks', 'task')
      .where('user.id = :userId', { userId })
      .orderBy('project.id', 'ASC')
      .addOrderBy('task.done', 'ASC')
      .getRawMany();

    const ids = projectIds.map((project) => project.project_id);

    const projectsNotLinked = await this.repository.find({
      where: {
        id: Not(In(ids)),
      },
      relations: ['users', 'tasks'],
    });

    return projectsNotLinked;
  }

  async findProjectsLinkedToUser(userId: number) {
    const projectIds = await this.repository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.users', 'user')
      .leftJoinAndSelect('project.tasks', 'task')
      .where('user.id = :userId', { userId })
      .orderBy('project.id', 'ASC')
      .addOrderBy('task.done', 'ASC')
      .getRawMany();

    const ids = projectIds.map((project) => project.project_id);

    const projectsLinked = await this.repository.find({
      where: {
        id: In(ids),
      },
      relations: ['users', 'tasks'],
    });

    return projectsLinked;
  }

  findAll(includeUsers?: boolean, includeTasks?: boolean) {
    if (includeUsers && includeTasks) {
      return this.repository.find({ relations: ['users', 'tasks'] });
    } else if (includeUsers) {
      return this.repository.find({ relations: ['users'] });
    } else if (includeTasks) {
      return this.repository.find({ relations: ['tasks'] });
    }
    return this.repository.find();
  }

  findOne(id: number, includeUsers?: boolean, includeTasks?: boolean) {
    if (includeUsers && includeTasks) {
      return this.repository.findOne({
        where: { id },
        relations: ['users', 'tasks'],
      });
    } else if (includeUsers) {
      return this.repository.findOne({
        where: { id },
        relations: ['users'],
      });
    } else if (includeTasks) {
      return this.repository.findOne({
        where: { id },
        relations: ['tasks'],
      });
    }
    return this.repository.findOneBy({ id });
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const project = await this.repository.findOneBy({ id });
    if (!project) return null;
    this.repository.merge(project, updateProjectDto);
    return this.repository.save(project);
  }

  async remove(id: number) {
    const project = await this.repository.findOneBy({ id });
    if (!project) return null;
    return this.repository.remove(project);
  }
}
