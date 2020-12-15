import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class User {

   @Field(() => ID)
   id: string

   @Field()
   username: string

   @Field()
   email: string

   password: string

   @Field(() => Date)
   createdAt: Date

   @Field(() => Date)
   updatedAt: Date
}