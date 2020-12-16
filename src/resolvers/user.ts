import { OrmContext } from "src/types";
import { User } from "../entities/User";
import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { UserRegisterInput } from "./input-types/UserRegisterInput";
import { ObjectId } from "@mikro-orm/mongodb";
//import session from "express-session";

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
      @Ctx() { req }: OrmContext
   ): ObjectId | undefined {
      console.log(req.session.userId)
      return req.session.userId
   }

   @Mutation(() => UserResponse)
   async register(
      @Arg('registerInput') registerInput: UserRegisterInput,
      @Ctx() { em, req }: OrmContext
   ): Promise<UserResponse> {

      const { email, username, password } = registerInput
      const repo = em.getRepository(User)

      await repo.nativeDelete({ email, username })

      const hasUser = await repo.findOne({ email, username })

      if (hasUser) {
         return {
            errors: [
               {
                  field: 'registerInput',
                  message: 'Already registered'
               }
            ]
         }
      }

      const user = new User({
         email,
         username,
         password,
      })

      await em.persistAndFlush(user)

      const userIndb = await repo.findOne({ email: user.email })
      const userId = userIndb?._id

      // Stores user id session
      // Gives a cookie to the user
      // Logs them in once registered
      req.session.userId = userId

      return {
         user
      }
   }


}