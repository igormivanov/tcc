import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "../../../repositories/prisma-users-repository";
import { z } from "zod";
import { AddFriendService } from "../../../services/users/add-friend";

export async function addFriend(request: FastifyRequest, reply: FastifyReply) {

  const addFriendBodySchema = z.object({
    followingId: z.string(),
  })

  const { followingId } = addFriendBodySchema.parse(request.body);

  try {
    const prismaUsersRepository = new PrismaUsersRepository()
    const addFriendService = new AddFriendService(prismaUsersRepository)

    await addFriendService.execute({followingId, followedById: request.user.sub})

    return reply.status(200).send()

  } catch (err) {
    throw err
  }
}