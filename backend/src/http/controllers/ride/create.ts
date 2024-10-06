import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaCoursesRepository } from "../../../repositories/prisma-courses-repository";
import { CreateService } from "../../../services/ride/create";
import { PrismaUsersRepository } from "../../../repositories/prisma-users-repository";
import { PrismaRideRepository } from "../../../repositories/prisma-ride-repository";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    origin: z.string(),
    destination: z.string(),
    passenger_limit: z.number().min(1).max(4)
  })

  const { origin, destination, passenger_limit } = createBodySchema.parse(request.body);
  
  try {
    const prismaRideRepository = new PrismaRideRepository()
    const prismaUsersRepository = new PrismaUsersRepository()
    const createService = new CreateService(prismaRideRepository, prismaUsersRepository)
    await createService.execute({ userId: request.user.sub, origin, destination, passenger_limit })

  } catch (err: any) {
    return reply.status(409).send({ message: err.message})
  }

  return reply.status(201).send()
}