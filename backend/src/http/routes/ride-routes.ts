import { FastifyInstance } from "fastify";
import { create } from "../controllers/ride/create";
import { remove } from "../controllers/ride/remove";
import { verifyJWT } from "../hooks/verify-jwt";
import { listRides } from "../controllers/ride/list-rides";

export async function rideRoutes(app: FastifyInstance){
  app.post('/rides', { onRequest: [verifyJWT] }, create)
  app.delete('/rides',{ onRequest: [verifyJWT] }, remove)
  app.get('/rides', listRides)
  // app.get('/users', { onRequest: [verifyJWT] }, listUsers)
  
}