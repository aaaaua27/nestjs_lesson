import { Field, ID, InputType } from "@nestjs/graphql";
import { MaxLength } from "class-validator";
import { Book } from "src/books/book";

@InputType()
export class newUserInput {
  @Field()
  @MaxLength(30)
  name: string;

  @Field()
  email: string;

  @Field(type => [ID],{nullable: true})
  books: Book[];
}