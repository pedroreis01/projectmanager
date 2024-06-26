import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  NotFoundException,
  UseGuards,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { StatusTaskDto } from './dto/status-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createTaskDto: CreateTaskDto) {
    return await this.taskService.create(createTaskDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    const task = await this.taskService.findOne(+id);
    if (!task) throw new NotFoundException();
    return task;
  }

  @Get('user-project/filter')
  @UseGuards(JwtAuthGuard)
  async findTasksForUserProject(
    @Query('userId') userId?: string,
    @Query('projectId') projectId?: string,
  ) {
    const parsedUserId = parseInt(userId, 10);
    const parsedProjectId = parseInt(projectId, 10);

    if (isNaN(parsedUserId) && isNaN(parsedProjectId)) {
      throw new BadRequestException('Invalid userId or projectId');
    }
    return this.taskService.getTasksUserProject(parsedUserId, parsedProjectId);
  }

  @Get('project/:projectId')
  async findAllTasksByProjectId(@Param('projectId') projectId: number) {
    const tasks = await this.taskService.findAllTasksByProjectId(projectId);
    if (!tasks) throw new NotFoundException();
    return tasks;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    const task = await this.taskService.update(+id, updateTaskDto);
    if (!task) throw new NotFoundException();
    return task;
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard)
  async updateTaskStatus(
    @Param('id') id: number,
    @Body() statusTaskDTO: StatusTaskDto,
  ) {
    const task = await this.taskService.updateTaskStatus(
      id,
      statusTaskDTO.done,
    );
    if (!task) throw new NotFoundException();
    return task;
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    const task = await this.taskService.remove(+id);
    if (!task) throw new NotFoundException();
  }
}
