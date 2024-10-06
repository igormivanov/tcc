import { FastifyReply, FastifyRequest } from "fastify";
import { ListUsersService } from "../../../services/users/list-users";
import { PrismaUsersRepository } from "../../../repositories/prisma-users-repository";
import { UpdateInterestsService } from "../../../services/users/update-interests";
import { z } from "zod";
import { UpdateGeneralService } from "../../../services/users/update-general";
import { UpdateEmailService } from "../../../services/users/update-email";

export async function updateEmail(request: FastifyRequest, reply: FastifyReply) {

  const updateEmailBodySchema = z.object({
    email: z.string().email()

  })

  const { email } = updateEmailBodySchema.parse(request.body);

  try {
    const prismaUsersRepository = new PrismaUsersRepository()
    const updateEmailService = new UpdateEmailService(prismaUsersRepository)

    await updateEmailService.execute({userId: request.user.sub, email})

    return reply.status(200).send()

  } catch (err) {
    throw err
  }
}