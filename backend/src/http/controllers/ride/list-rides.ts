import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaRideRepository } from "../../../repositories/prisma-ride-repository";
import { z } from "zod";
import { ListRidesService } from "../../../services/ride/list-rides";

export async function listRides(request: FastifyRequest, reply: FastifyReply) {
  const listRidesQuerySchema = z.object({
    origin: z.string().optional(),
    destination: z.string().optional(),
  })

  const { origin, destination} = listRidesQuerySchema.parse(request.query);

  try {
    const prismaRideRepository = new PrismaRideRepository()
    const listRidesService = new ListRidesService(prismaRideRepository)

    const rides = await listRidesService.execute({origin, destination})

    return reply.status(200).send(rides)

  } catch (err) {
    throw err
  }
}