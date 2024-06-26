import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, NotFoundException, UseGuards, Query, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    if(!user) throw new BadRequestException('Email ou login ja existem');
    return user;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Query('includeProjects') includeProjects: string) {
    const includeProjectsBoolean = includeProjects === 'true';
    return this.userService.findAll(includeProjectsBoolean);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string, @Query('includeProjects') includeProjects: string) {
    const includeProjectsBoolean = includeProjects === 'true';
    const user = await this.userService.findOne(+id, includeProjectsBoolean);
    if (!user) throw new NotFoundException();
    return user;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.update(+id, updateUserDto);
    if(!user) throw new NotFoundException();
    return user;
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    const user = await this.userService.remove(+id);
    if(!user) throw new NotFoundException();
  }
}
