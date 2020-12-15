import { Query, Resolver } from "type-graphql";

@Resolver()
export class UserResolver {

   // temp query for server to work
   @Query(() => String)
   me(): string {
      return 'Me query'
   }
}