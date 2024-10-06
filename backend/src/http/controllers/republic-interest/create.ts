import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaInterestsRepository } from "../../../repositories/prisma-interests-repository";
import { TYPES } from "@prisma/client";
import { CreateService } from "../../../services/republic-interest/create";
import { PrismaUsersRepository } from "../../../repositories/prisma-users-repository";
import { PrismaRepublicInterestRepository } from "../../../repositories/prisma-republic-interest-repository";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    resident_limit: z.number(),
    preferences: z.enum([TYPES.ANYONE, TYPES.MAN, TYPES.WOMAN]),
  })

  const { preferences, resident_limit} = createBodySchema.parse(request.body);
  
  try {
    const prismaRepublicInterestRepository = new PrismaRepublicInterestRepository()
    const prismaUsersRepository = new PrismaUsersRepository()
    const createService = new CreateService(prismaRepublicInterestRepository, prismaUsersRepository)

    await createService.execute({ preferences, resident_limit, userId: request.user.sub })

  } catch (err: any) {
    return reply.status(409).send({ message: err.message})
  }

  return reply.status(201).send()
}