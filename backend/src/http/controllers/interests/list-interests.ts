import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaInterestsRepository } from "../../../repositories/prisma-interests-repository";
import { ListInterestsService } from "../../../services/interest/list-interests";

export async function listInterests(_request: FastifyRequest, reply: FastifyReply) {
  try {
    const prismaInterestsRepository = new PrismaInterestsRepository()
    const listInterestsService = new ListInterestsService(prismaInterestsRepository)

    const interests = await listInterestsService.execute()

    return reply.status(200).send(interests)

  } catch (err) {
    throw err
  }
}