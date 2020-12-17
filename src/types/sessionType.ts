import { ObjectId } from "@mikro-orm/mongodb";

declare module "express-session" {
   interface SessionData {
      userId: ObjectId | undefined
   }
}