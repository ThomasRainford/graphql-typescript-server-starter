import argon2 from "argon2";
import { COOKIE_NAME } from "../constants";
import { OrmContext } from "../types/types";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";
import { UserRegisterInput } from "./input-types/UserRegisterInput";
import { UserResponse } from './object-types/UserResponse';
import { validateRegister } from '../utils/validateRegister'

@Resolver(User)
export class UserResolver {

   // temp query for testing. 
   @Query(() => String)
   me(
      @Ctx() { req }: OrmContext
   ): string | undefined {
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

      // Validate register info.
      const errors: UserResponse | null = validateRegister(registerInput)
      if (errors) {
         return errors
      }

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

      const hashedPassword = await argon2.hash(password)
      const user = new User({
         email,
         username,
         password: hashedPassword,
      })

      await em.persistAndFlush(user)

      const userIndb = await repo.findOne({ email: user.email })
      const userId = userIndb?._id

      // Stores user id session
      // Gives a cookie to the user
      // Logs them in once registered
      req.session.userId = userId?.toHexString()

      return {
         user
      }
   }

   @Query(() => UserResponse)
   async login(
      @Arg('usernameOrEmail') usernameOrEmail: string,
      @Arg('password') password: string,
      @Ctx() { req, em }: OrmContext
   ): Promise<UserResponse> {

      const repo = em.getRepository(User)

      const isEmail = usernameOrEmail.includes('@')
      const user = await repo.findOne(isEmail
         ? {
            email: usernameOrEmail
         } : {
            username: usernameOrEmail
         })

      // Validate usernameOrEmail.
      if (!user) {
         return {
            errors: [
               {
                  field: 'usernameOrEmail',
                  message: isEmail ? 'Email does not exist.' : 'Username does not exist.'
               }
            ]
         }
      }

      // Validate password.
      const valid = await argon2.verify(user.password, password)
      if (!valid) {
         return {
            errors: [
               {
                  field: 'password',
                  message: 'Incorrect Password.'
               }
            ]
         }
      }

      // log the user in
      req.session.userId = user._id.toHexString()
      console.log(req.session.cookie)

      return {
         user
      }
   }

   @Query(() => Boolean)
   async logout(
      @Ctx() { req, res }: OrmContext
   ): Promise<boolean> {
      return new Promise((resolve) => {
         req.session.destroy((error) => {
            res.clearCookie(COOKIE_NAME)
            if (error) {
               console.log(error)
               resolve(false)
               return
            }
            resolve(true)
         })
      })
   }


}