import { User } from "src/entities/User";
import { Field, InputType } from "type-graphql";

@InputType()
export class UserRegisterInput implements Partial<User> {

   @Field()
   email: string;

   @Field()
   username: string;

   @Field()
   password: string;
}
