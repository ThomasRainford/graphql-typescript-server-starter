import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";
import { Field, ObjectType } from "type-graphql";

@ObjectType() // type-graphql
@Entity()     // orm
export class User {

   @Field(() => ObjectId)
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
}