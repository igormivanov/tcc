import { FastifyInstance } from "fastify";
import { create } from "../controllers/courses/create";
import { listCourses } from "../controllers/courses/list-courses";
import { listCities } from "../controllers/cities/list-cities";

export async function citiesRoutes(app: FastifyInstance){
  app.get('/cities', listCities)
  // app.get('/users', { onRequest: [verifyJWT] }, listUsers)
  
}