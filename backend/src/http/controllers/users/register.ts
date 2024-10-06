import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { RegisterService } from "../../../services/users/register";
import { PrismaUsersRepository } from "../../../repositories/prisma-users-repository";
import { UserAlreadyExistsError } from "../../../services/errors/user-already-exists-error";
import { PrismaCoursesRepository } from "../../../repositories/prisma-courses-repository";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    semester: z.number().max(10),
    password: z.string().min(6),
    courseId: z.string(),
    tel: z.string()
  })

  const { name, email, semester, password, courseId, tel } = registerBodySchema.parse(request.body);
  
  try {
    const prismaUsersRepository = new PrismaUsersRepository()
    const prismaCoursesRepository = new PrismaCoursesRepository()
    const registerService = new RegisterService(prismaUsersRepository, prismaCoursesRepository)
    console.log("controller")
    await registerService.execute({ name, email, semester, password, courseId, tel})

  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message})
    }
    console.log("erro caindo do controller")
    throw err
  }

  return reply.status(201).send()
}