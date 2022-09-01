import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async create(createUserDto: CreateUserDto) {
    const email = createUserDto.email;
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      return existingUser;
    }
    const bcryptPassword = await bcrypt
      .hash(createUserDto.password, 10)
      .then((r: any) => r);
    const user = this.userRepository.create({
      name: createUserDto.name,
      email: createUserDto.email,
      password: bcryptPassword,
      role: createUserDto.role,
    });
    return await this.userRepository.save(user);
  }

  public async findByUserEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });
    if (user) {
      return user;
    }
    return new HttpException('USER NOT FOUND', HttpStatus.NOT_FOUND);
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(
    condition: Partial<Pick<User, 'id' | 'email'>>,
  ): Promise<User | undefined> {
    return this.userRepository.findOne({ where: condition });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
