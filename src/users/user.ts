import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
