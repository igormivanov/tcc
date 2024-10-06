import { FastifyReply, FastifyRequest } from "fastify";
import { ListUsersService } from "../../../services/users/list-users";
import { PrismaUsersRepository } from "../../../repositories/prisma-users-repository";
import { UpdateInterestsService } from "../../../services/users/update-interests";
import { z } from "zod";
import { UpdateGeneralService } from "../../../services/users/update-general";

export async function updateGeneral(request: FastifyRequest, reply: FastifyReply) {

  const updateGeneralBodySchema = z.object({
    name: z.string(),
    courseId: z.string().uuid(),
    semester: z.number(),
    tel: z.string()

  })

  const { name, courseId, semester, tel } = updateGeneralBodySchema.parse(request.body);

  try {
    const prismaUsersRepository = new PrismaUsersRepository()
    const updateGeneralService = new UpdateGeneralService(prismaUsersRepository)

    await updateGeneralService.execute({userId: request.user.sub, name, courseId, semester, tel})

    return reply.status(200).send()

  } catch (err) {
    throw err
  }
}