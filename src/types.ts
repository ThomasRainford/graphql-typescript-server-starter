import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";


export type OrmContext = {
   em: EntityManager<IDatabaseDriver<Connection>>
   req: Request,
   res: Response,
}