import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaCoursesRepository } from "../../../repositories/prisma-courses-repository";
import { RemoveService } from "../../../services/courses/remove";
;

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  const removeParamSchema = z.object({
    courseId: z.string().uuid(),
  })

  const { courseId } = removeParamSchema.parse(request.params);
  
  try {
    const prismaCoursesRepository = new PrismaCoursesRepository()
    const removeService = new RemoveService(prismaCoursesRepository)

    await removeService.execute({ courseId })

  } catch (err: any) {
    return reply.status(409).send({ message: err.message})
  }

  return reply.status(200).send()
}