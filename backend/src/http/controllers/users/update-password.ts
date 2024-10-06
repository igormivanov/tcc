import { FastifyReply, FastifyRequest } from "fastify";
import { ListUsersService } from "../../../services/users/list-users";
import { PrismaUsersRepository } from "../../../repositories/prisma-users-repository";
import { UpdateInterestsService } from "../../../services/users/update-interests";
import { z } from "zod";
import { UpdateGeneralService } from "../../../services/users/update-general";
import { UpdatePasswordService } from "../../../services/users/update-password";

export async function updatePassword(request: FastifyRequest, reply: FastifyReply) {

  const updatePasswordBodySchema = z.object({
    currentPassword: z.string().min(6),
    newPassword: z.string().min(6)

  })

  const { currentPassword, newPassword} = updatePasswordBodySchema.parse(request.body);

  try {
    const prismaUsersRepository = new PrismaUsersRepository()
    const updatePasswordService = new UpdatePasswordService(prismaUsersRepository)

    await updatePasswordService.execute({userId: request.user.sub, currentPassword, newPassword})

    return reply.status(200).send()

  } catch (err) {
    throw err
  }
}