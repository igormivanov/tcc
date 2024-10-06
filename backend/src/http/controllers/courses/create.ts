import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaCoursesRepository } from "../../../repositories/prisma-courses-repository";
import { CreateService } from "../../../services/courses/create";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    duration: z.number()
  })

  const { name, duration } = createBodySchema.parse(request.body);
  
  try {
    const prismaCoursesRepository = new PrismaCoursesRepository()
    const createService = new CreateService(prismaCoursesRepository)

    await createService.execute({ name, duration})

  } catch (err: any) {
    return reply.status(409).send({ message: err.message})
  }

  return reply.status(201).send()
}