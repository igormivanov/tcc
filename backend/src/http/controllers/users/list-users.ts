import { FastifyReply, FastifyRequest } from "fastify";
import { ListUsersService } from "../../../services/users/list-users";
import { PrismaUsersRepository } from "../../../repositories/prisma-users-repository";

export async function listUsers(_request: FastifyRequest, reply: FastifyReply) {
  try {
    const prismaUsersRepository = new PrismaUsersRepository()
    const listUsersService = new ListUsersService(prismaUsersRepository)

    const users = await listUsersService.execute()

    return reply.status(200).send(users)

  } catch (err) {
    throw err
  }
}