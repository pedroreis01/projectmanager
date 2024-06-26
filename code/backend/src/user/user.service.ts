import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.repository.findOne({ where: { login: createUserDto.login } });
    if (existingUser) {
      return null;
    }

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(createUserDto.password, salt, 32)) as Buffer;
    const saltAndHash = `${salt}.${hash.toString('hex')}`;

    const newUser = {
      ...createUserDto,
      password: saltAndHash,
    };

    const user = this.repository.create(newUser);
    const savedUser = await this.repository.save(user);
    const { password, ...result } = savedUser;
    return result;
  }

  async findAll(includeProjects?: boolean) {
    if (includeProjects) {
      return this.repository.find({ relations: ['projects'] });
    }
    return this.repository.find();
  }

  async findOne(id: number, includeProjects?: boolean) {
    if (includeProjects) {
      return this.repository.findOne({
        where: { id },
        relations: ['projects'],
      });
    }
    return this.repository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.repository.findOneBy({ id });
    if (!user) return null;
    this.repository.merge(user, updateUserDto);
    return this.repository.save(user);
  }

  async remove(id: number) {
    const user = await this.repository.findOneBy({ id });
    if (!user) return null;
    return this.repository.remove(user);
  }
}
