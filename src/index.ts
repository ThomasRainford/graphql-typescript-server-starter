import { MikroORM } from '@mikro-orm/core'
import { ApolloServer } from "apollo-server-express"
import 'dotenv-safe/config'
import express from "express"
import 'reflect-metadata'
import { buildSchema } from "type-graphql"
import ormConfig from './mikro-orm.config'
import { UserResolver } from "./resolvers/user"

const main = async () => {

   // mikro-orm config will eventually be in a seperate json file.
   const orm = await MikroORM.init(ormConfig)

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