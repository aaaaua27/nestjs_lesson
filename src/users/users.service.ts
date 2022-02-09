import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/books/book';
import { Connection, getConnection, Repository } from 'typeorm';
import { newUserInput } from './dto/newUser.Input';
import { User } from './user';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['books'] });
  }

  findOneById(id: number): Promise<User> {
    return this.usersRepository.findOne(id, { relations: ['books'] });
  }

  async create(data: newUserInput): Promise<User> {
    const user = this.usersRepository.create(data);
    await this.usersRepository.save(user);
    return user;
  }

  // async create(data: newUserInput): Promise<User> {
  //   const user = this.usersRepository.create(data);
  //   let book = new Book();
  //   let setUser = new User();
  //   book.id = data.bookId;
  //   setUser = {
  //     ...book,
  //     user,
  //   };

  //   const result = await this.usersRepository.save(setUser);
  //   return result;
  // }

  async remove(id: number): Promise<boolean> {
    const result = await this.usersRepository.delete(id);
    return result.affected > 0;
  }

  // // async addBook(): Promise<Book> {
  // //   const queryRunner = getConnection().createQueryRunner();

  // //   const book = this.usersRepository.findOne({relations:['book']});

  //   const books = await queryRunner.connection
  //   .getRepository(Book)
  //   .createQueryBuilder("book")
  //   .leftJoinAndSelect("book.user", "user")
  //   .getMany();

  // //   return books
  //   // const user = new User();
  //   // let setBook = new Book();
  //   // setBook = {
  //   //   ...book,
  //   //   user,
  //   // };

  // await this.usersRepository.save(setBook);
  // return user;
  // }
}
