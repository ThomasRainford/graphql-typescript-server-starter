import 'reflect-metadata'
import { ApolloServer } from "apollo-server-express"
import express from "express"
import { buildSchema } from "type-graphql"
import { UserResolver } from "./resolvers/user"


const main = async () => {

   const app = express()

   const apolloServer = new ApolloServer({
      schema: await buildSchema({
         resolvers: [UserResolver],
         validate: false
      }),

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