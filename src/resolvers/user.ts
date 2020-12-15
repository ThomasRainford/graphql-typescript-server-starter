import { OrmContext } from "src/types";
import { Ctx, Query, Resolver } from "type-graphql";

@Resolver()
export class UserResolver {

   // temp query for server to work
   @Query(() => String)
   me(
      @Ctx() { em }: OrmContext
   ): string {
      return 'Me query'
   }
}