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
  Query,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { LinkUsersProjectDto } from './dto/link-users-project.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Post('/user/:id')
  @UseGuards(JwtAuthGuard)
  async createWithUser(
    @Body() body: CreateProjectDto,
    @Param('id') userId: number,
  ) {
    const { name, description, startDate } = body;
    return this.projectService.createWithUser(
      name,
      description,
      startDate,
      userId,
    );
  }

  @Post(':id/link-users')
  @UseGuards(JwtAuthGuard)
  async linkUsers(@Body() body: LinkUsersProjectDto, @Param('id') id: number) {
    const { userIds } = body;
    return this.projectService.linkUsers(id, userIds);
  }

  @Post(':id/unlink-users')
  @UseGuards(JwtAuthGuard)
  async unlinkUsers(
    @Param('id') id: number,
    @Body() body: LinkUsersProjectDto,
  ) {
    try {
      const { userIds } = body;
      const project = await this.projectService.unlinkUsers(id, userIds);
      return project;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(
    @Query('includeUsers') includeUsers: string,
    @Query('includeTasks') includeTasks: string,
  ) {
    const includeUsersBoolean = includeUsers === 'true';
    const includeTasksBoolean = includeTasks === 'true';
    return this.projectService.findAll(
      includeUsersBoolean,
      includeTasksBoolean,
    );
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(
    @Param('id') id: string,
    @Query('includeUsers') includeUsers: string,
    @Query('includeTasks') includeTasks: string,
  ) {
    const includeUsersBoolean = includeUsers === 'true';
    const includeTasksBoolean = includeTasks === 'true';
    const project = await this.projectService.findOne(
      +id,
      includeUsersBoolean,
      includeTasksBoolean,
    );
    if (!project) throw new NotFoundException();
    return project;
  }

  @Get('unlinked-user/:userId')
  @UseGuards(JwtAuthGuard)
  async findProjectsNotLinkedToUser(@Param('userId') userId: number) {
    return this.projectService.findProjectsNotLinkedToUser(userId);
  }

  @Get('linked-user/:userId')
  @UseGuards(JwtAuthGuard)
  async findProjectsLinkedToUser(@Param('userId') userId: number) {
    return this.projectService.findProjectsLinkedToUser(userId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    const project = await this.projectService.update(+id, updateProjectDto);
    if (!project) throw new NotFoundException();
    return project;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    try {
      const project = await this.projectService.remove(+id);
      if (!project) throw new NotFoundException();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
