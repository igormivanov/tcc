import { FastifyInstance } from "fastify";
import { create } from "../controllers/republic-interest/create";
import { listRepublicInterest } from "../controllers/republic-interest/list-republic-interest";
import { remove } from "../controllers/republic-interest/remove";
import { verifyJWT } from "../hooks/verify-jwt";


export async function republicInterestRoutes(app: FastifyInstance){
  app.post('/republic-interest',{ onRequest: [verifyJWT] }, create)
  app.get('/republic-interest', listRepublicInterest)
  app.delete('/republic-interest',{ onRequest: [verifyJWT] }, remove)
  // app.get('/users', { onRequest: [verifyJWT] }, listUsers)
  
}