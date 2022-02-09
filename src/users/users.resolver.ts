import { NotFoundException } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { newBookInput } from 'src/books/dto/newBook.input';
import { newUserInput } from './dto/newUser.Input';
import { User } from './user';
import { UsersService } from './users.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query((returns) => [User])
  users(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query((returns) => User)
  async getUser(@Args({ name: 'id', type: () => Int }) id: number) {
    const user = await this.usersService.findOneById(id);
    if (!user) {
      throw new NotFoundException(id);
    }
    return user;
  }

  @Mutation((returns) => User)
  addUser(@Args('newUser') newUser: newUserInput): Promise<User> {
    return this.usersService.create(newUser)
  }

  @Mutation((returns) => Boolean)
  async removeUser(@Args({name: 'id', type: () => Int}) id: number){
    return this.usersService.remove(id);
  }

  // @Mutation((returns) => User)
  // addBooks(@Args('newBook') newBook: newBookInput): Promise<Book> {
  //   return this.usersService.createBook(newBook)
  // }
}
