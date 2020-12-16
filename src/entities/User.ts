import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";
import { UserRegisterInput } from "../resolvers/input-types/UserRegisterInput";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType() // type-graphql
@Entity()     // orm
export class User {

   @Field(() => ID)
   @PrimaryKey()
   _id: ObjectId

   @Field()
   @Property()
   username: string

   @Field()
   @Property()
   email: string

   @Property()
   password: string

   @Field(() => Date)
   @Property()
   createdAt: Date

   @Field(() => Date)
   @Property()
   updatedAt: Date

   constructor({ email, username, password }: UserRegisterInput) {
      this.email = email
      this.username = username
      this.password = password // Could hash password here
   }

}