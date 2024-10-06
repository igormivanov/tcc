import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "../../../repositories/prisma-users-repository";
import { z } from "zod";
import { AddFriendService } from "../../../services/users/add-friend";
import { RemoveFriendService } from "../../../services/users/remove-friend";

export async function removeFriend(request: FastifyRequest, reply: FastifyReply) {

  const removeFriendBodySchema = z.object({
    followingId: z.string(),
  })

  const { followingId } = removeFriendBodySchema.parse(request.body);

  try {
    const prismaUsersRepository = new PrismaUsersRepository()
    const removeFriendService = new RemoveFriendService(prismaUsersRepository)

    await removeFriendService.execute({followingId, followedById: request.user.sub})

    return reply.status(200).send()

  } catch (err) {
    throw err
  }
}