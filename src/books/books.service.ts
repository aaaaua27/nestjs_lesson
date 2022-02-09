import { Injectable } from '@nestjs/common';
import { Book } from './book';
import { newBookInput } from './dto/newBook.input';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { User } from 'src/users/user';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepostiory: Repository<Book>,
  ) {}

  findAll(): Promise<Book[]> {
    return this.booksRepostiory.find({ relations: ["user"] });
  }

  findOneById(id: number): Promise<Book> {
    return this.booksRepostiory.findOne(id,{relations:['user']});
  }

  getUser(book: Book) {
    const { userId } = book;
    return this.booksRepostiory.findOne(userId)
  }

  async create(data: newBookInput): Promise<Book> {
    const book = this.booksRepostiory.create(data);
    const user = new User();
    let setBook = new Book();
     user.id = data.userId;
    setBook = {
      ...book,
      user,
    };

    const result = await this.booksRepostiory.save(setBook);
    return result;
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.booksRepostiory.delete(id);
    return result.affected > 0;
  }

  // async addUser(id: User): Promise<Book> {
  //   this.booksRepostiory
  //     .createQueryBuilder()
  //     .insert()
  //     .into(Book)
  //     .values(id)
  //     .execute();
  //   return book;
  // }
}
