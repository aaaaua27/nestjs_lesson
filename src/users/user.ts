import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Book } from 'src/books/book';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
   id: number;

  @Column({ length: '30' })
  @Field()
  name: string;

  @Column()
  @Field()
  email: string;

  @OneToMany((type) => Book, (book) => book.user, { nullable: true })
  books?: Book[];
}
