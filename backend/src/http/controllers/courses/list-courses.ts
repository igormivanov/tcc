import { FastifyReply, FastifyRequest } from "fastify";
import { ListUsersService } from "../../../services/users/list-users";
import { PrismaUsersRepository } from "../../../repositories/prisma-users-repository";
import { PrismaCoursesRepository } from "../../../repositories/prisma-courses-repository";
import { ListCoursesService } from "../../../services/courses/list-courses";

export async function listCourses(_request: FastifyRequest, reply: FastifyReply) {
  try {
    const prismaCoursesRepository = new PrismaCoursesRepository()
    const listCoursesService = new ListCoursesService(prismaCoursesRepository)

    const courses = await listCoursesService.execute()

    return reply.status(200).send(courses)

  } catch (err) {
    throw err
  }
}