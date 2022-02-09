import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/user';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  RelationId,
} from 'typeorm';

@Entity()
@ObjectType()
export class Book {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number;
  //
  @Column({ length: '30' })
  @Field()
  title: string;

  @Column()
  @Field((type) => [String])
  author: string;

  @Column({ type: 'int', unsigned: true })
  @Field((type) => Int)
  price: number;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @ManyToOne((type) => User, (user) => user.books, {
    nullable: true,
    cascade: true,
  })
  user?: User;

  @RelationId((book: Book) => book.user)
  userId: number;
}
