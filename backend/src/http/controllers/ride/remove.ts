import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaCoursesRepository } from "../../../repositories/prisma-courses-repository";
import { CreateService } from "../../../services/ride/create";
import { PrismaUsersRepository } from "../../../repositories/prisma-users-repository";
import { PrismaRideRepository } from "../../../repositories/prisma-ride-repository";
import { RemoveService } from "../../../services/ride/remove";

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  // const removeParamSchema = z.object({
  //   userId: z.string().uuid(),
  // })

  // const { userId } = removeParamSchema.parse(request.params);
  
  try {
    console.log("cheguei")
    console.log(request.user.sub)
    const prismaRideRepository = new PrismaRideRepository()
    const removeService = new RemoveService(prismaRideRepository)
    // console.log(request.user.sub)
    console.log("cheguei2")
    await removeService.execute({ userId: request.user.sub })

  } catch (err: any) {
    return reply.status(409).send({ message: err.message})
  }

  return reply.status(200).send()
}