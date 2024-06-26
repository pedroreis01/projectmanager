import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/project/entities/project.entity';
import * as moment from 'moment';
import { UserTaskDto } from './dto/user-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly repository: Repository<Task>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}
  async create(createTaskDto: CreateTaskDto) {
    const { projectId, ...taskData } = createTaskDto;
    const project = await this.projectRepository.findOneBy({ id: projectId });

    if (!project) {
      return null;
    }

    const newTask = this.repository.create({
      ...taskData,
      project: project,
    });

    return await this.repository.save(newTask);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  async getTasksUserProject(
    userId?: number,
    projectId?: number,
  ): Promise<UserTaskDto[]> {
    let query = this.repository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.project', 'project');

    if (userId) {
      query = query
        .leftJoin('task.project', 'project_user')
        .leftJoin('project_user.users', 'user')
        .where('user.id = :userId', { userId });
    }

    if (projectId) {
      query = query.where('task.project.id = :projectId', { projectId });
    }

    const tasks = await query
      .select([
        'task.id',
        'task.name',
        'task.description',
        'task.dueDate',
        'task.done',
        'task.finishedDate',
        'project.name',
        'project.id',
      ])
      .orderBy('task.done', 'ASC')
      .getMany();
    const result: UserTaskDto[] = tasks.map((task) => ({
      id: task.id,
      name: task.name,
      description: task.description,
      dueDate: task.dueDate,
      done: task.done,
      finishedDate: task.finishedDate,
      projectName: task.project.name,
      projectId: task.project.id,
    }));

    return result;
  }

  async findAllTasksByProjectId(projectId: number): Promise<Task[]> {
    const project = await this.projectRepository.findOneBy({ id: projectId });
    if (!project) {
      throw null;
    }

    return this.repository.find({ where: { project: { id: projectId } } });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const { projectId, ...taskData } = updateTaskDto;

    const task = await this.repository.findOneBy({ id });

    if (!task) {
      throw new Error('Tarefa não encontrada.');
    }

    this.repository.merge(task, taskData);

    if (projectId) {
      const project = await this.projectRepository.findOneBy({
        id: projectId,
      });

      if (!project) {
        throw new Error('Projeto não encontrado.');
      }
      task.project = project;
    }

    return this.repository.save(task);
  }

  async updateTaskStatus(id: number, done: boolean) {
    const task = await this.repository.findOneBy({ id });
    if (!task) return null;

    task.done = done;
    if (done) {
      const date = moment().format('YYYY-MM-DD HH:mm:ss');
      task.finishedDate = date.toString();
    } else {
      task.finishedDate = null; // Reset finishedDate if task is not done
    }
    return this.repository.save(task);
  }

  async remove(id: number) {
    const task = await this.repository.findOneBy({ id });
    if (!task) return null;
    return this.repository.remove(task);
  }
}
