import { MikroORM } from '@mikro-orm/core'
import { ApolloServer } from "apollo-server-express"
import express from "express"
import 'reflect-metadata'
import { buildSchema } from "type-graphql"
import { User } from './entities/User'
import { UserResolver } from "./resolvers/user"


const main = async () => {

   // mikro-orm config will eventually be in a seperate json file.
   const orm = await MikroORM.init({
      entities: [User],
      dbName: 'test-db-name',
      type: 'mongo',
   })

   const app = express()

   const apolloServer = new ApolloServer({
      schema: await buildSchema({
         resolvers: [UserResolver],
         validate: false
      }),
      context: () => ({ em: orm.em })
   })

   apolloServer.applyMiddleware({
      app,
      cors: false
   })

   const port = process.env.PORT || 3000
   app.listen(port, () => {
      console.log(`Server started on port ${port}`)
   })

}

try {
   main()
} catch (error) {
   console.log(error)
}