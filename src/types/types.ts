import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";
// import { ObjectId } from "@mikro-orm/mongodb";
import { Redis } from "ioredis";
import { Request, Response } from 'express'

export type OrmContext = {
   em: EntityManager<IDatabaseDriver<Connection>>
   req: Request /*& { session: { userId: ObjectId | undefined } }*/,
   res: Response,
   redis: Redis
}