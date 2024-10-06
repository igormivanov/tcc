import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "../../../repositories/prisma-users-repository";
import { z } from "zod";
import { AddFriendService } from "../../../services/users/add-friend";
import { GetUserService } from "../../../services/users/get-user";

export async function getUser(request: FastifyRequest, reply: FastifyReply) {

  const getUserParamsSchema = z.object({
    userId: z.string().uuid().optional()
  })

  const { userId } = getUserParamsSchema.parse(request.params);

  try {
    const prismaUsersRepository = new PrismaUsersRepository()
    const getUserService = new GetUserService(prismaUsersRepository)

    console.log(userId)
    const id = userId || request.user.sub

    const user = await getUserService.execute({id})

    return reply.status(200).send(user)

  } catch (err) {
    throw err
  }
}