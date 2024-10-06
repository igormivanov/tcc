import { FastifyReply, FastifyRequest } from "fastify";
import { ListUsersService } from "../../../services/users/list-users";
import { PrismaUsersRepository } from "../../../repositories/prisma-users-repository";
import { UpdateInterestsService } from "../../../services/users/update-interests";
import { z } from "zod";

export async function updateInterests(request: FastifyRequest, reply: FastifyReply) {

  const updateInterestsBodySchema = z.object({
    interestIds: z.array(z.string())
  })

  const { interestIds } = updateInterestsBodySchema.parse(request.body);

  try {
    const prismaUsersRepository = new PrismaUsersRepository()
    const updateInterestsService = new UpdateInterestsService(prismaUsersRepository)

    await updateInterestsService.execute({userId: request.user.sub, interestIds})

    return reply.status(200).send()

  } catch (err) {
    throw err
  }
}