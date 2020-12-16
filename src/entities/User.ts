import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType() // type-graphql
@Entity()     // orm
export class User {

   @Field(() => ID)
   @PrimaryKey()
   id: string

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
}