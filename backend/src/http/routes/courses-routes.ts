import { FastifyInstance } from "fastify";
import { create } from "../controllers/courses/create";
import { listCourses } from "../controllers/courses/list-courses";

export async function coursesRoutes(app: FastifyInstance){
  app.post('/courses', create)
  app.get('/courses', listCourses)
  // app.get('/users', { onRequest: [verifyJWT] }, listUsers)
  
}