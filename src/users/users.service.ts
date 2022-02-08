import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { newUserInput } from './dto/newUser.Input';
import { User } from './user';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ){}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOneById(id: number): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async create(data: newUserInput): Promise<User> {
    const user = this.usersRepository.create(data);
    await this.usersRepository.save(user);
    return user;
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.usersRepository.delete(id);
    return result.affected > 0;
  }
}
