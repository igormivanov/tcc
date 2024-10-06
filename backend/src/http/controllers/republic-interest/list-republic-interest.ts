import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaRepublicInterestRepository } from "../../../repositories/prisma-republic-interest-repository";
import { ListRepublicInterestService } from "../../../services/republic-interest/list-republic-interest";
import { z } from "zod";
import { TYPES } from "@prisma/client";
import { request } from "http";

export async function listRepublicInterest(request: FastifyRequest, reply: FastifyReply) {
  const listRepublicInterestsQuerySchema = z.object({
    resident_limit: z.coerce.number().optional(),
    preferences: z.enum([TYPES.ANYONE, TYPES.MAN, TYPES.WOMAN]).optional(),
  })

  const {resident_limit, preferences } = listRepublicInterestsQuerySchema.parse(request.query);

  try {
    const prismaRepublicInterestRepository = new PrismaRepublicInterestRepository()
    const listRepublicInterestService = new ListRepublicInterestService(prismaRepublicInterestRepository)
    const republicInterest = await listRepublicInterestService.execute({resident_limit, preferences})

    return reply.status(200).send(republicInterest)

  } catch (err) {
    throw err
  }
}