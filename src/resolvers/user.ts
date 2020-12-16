import { OrmContext } from "src/types";
import { User } from "../entities/User";
import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { UserRegisterInput } from "./input-types/UserRegisterInput";

@ObjectType()
class FieldError {
   @Field()
   field: string

   @Field()
   message: string
}

@ObjectType()
class UserResponse {
   @Field(() => [FieldError], { nullable: true })
   errors?: FieldError[]

   @Field(() => User, { nullable: true })
   user?: User
}

@Resolver(User)
export class UserResolver {

   // temp query for server to work
   @Query(() => String)
   me(
      //@Ctx() { em }: OrmContext
   ): string {
      return 'Me query'
   }

   @Mutation(() => UserResponse)
   register(
      @Arg('registerInput') registerInput: UserRegisterInput,
      @Ctx() { em, req }: OrmContext
   ): UserResponse {

      const user = new User({
         email: registerInput.email,
         username: registerInput.username,
         password: registerInput.password,
      })

      //em.persist(user).flush()


      return {
         user
      }
   }


}