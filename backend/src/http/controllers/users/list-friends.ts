import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "../../../repositories/prisma-users-repository";
import { z } from "zod";
import { ListFriendsService } from "../../../services/users/list-friends";



export async function listFriends(request: FastifyRequest, reply: FastifyReply) {

  try {
    const prismaUsersRepository = new PrismaUsersRepository()
    const listFriendsService = new ListFriendsService(prismaUsersRepository)
  
    const friends = await listFriendsService.execute({userId: request.user.sub})
    
    return reply.status(200).send(friends)

  } catch (err) {
    throw err
  }
}