import { FastifyInstance } from "fastify";
import { create } from "../controllers/interests/create";
import { listInterests } from "../controllers/interests/list-interests";


export async function interestsRoutes(app: FastifyInstance){
  app.post('/interests',create)
  app.get('/interests', listInterests)
  // app.get('/users', { onRequest: [verifyJWT] }, listUsers)
  
}