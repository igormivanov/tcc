import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaCoursesRepository } from "../../../repositories/prisma-courses-repository";
import { CreateService } from "../../../services/ride/create";
import { PrismaUsersRepository } from "../../../repositories/prisma-users-repository";
import { PrismaRideRepository } from "../../../repositories/prisma-ride-repository";
import { PrismaRepublicInterestRepository } from "../../../repositories/prisma-republic-interest-repository";
import { RemoveService } from "../../../services/republic-interest/remove";

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  // const removeParamSchema = z.object({
  //   userId: z.string().uuid(),
  // })

  // const { userId } = removeParamSchema.parse(request.params)
  
  try {
    const prismaRepublicInterestRepository = new PrismaRepublicInterestRepository()
    const removeService = new RemoveService(prismaRepublicInterestRepository)

    await removeService.execute({ userId: request.user.sub })

  } catch (err: any) {
    return reply.status(409).send({ message: err.message})
  }

  return reply.status(200).send()
}