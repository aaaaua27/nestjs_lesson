import { Field, InputType } from "@nestjs/graphql";
import { MaxLength } from "class-validator";

@InputType()
export class newUserInput {
  @Field()
  @MaxLength(30)
  name: string;

  @Field()
  email: string;
}