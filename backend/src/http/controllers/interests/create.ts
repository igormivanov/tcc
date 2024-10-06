import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaInterestsRepository } from "../../../repositories/prisma-interests-repository";
import { CreateService } from "../../../services/interest/create";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
  })

  const { name } = createBodySchema.parse(request.body);
  
  try {
    const prismaInterestsRepository = new PrismaInterestsRepository()
    const createService = new CreateService(prismaInterestsRepository)

    await createService.execute({ name })

  } catch (err: any) {
    return reply.status(409).send({ message: err.message})
  }

  return reply.status(201).send()
}