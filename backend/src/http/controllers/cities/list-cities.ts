import { FastifyReply, FastifyRequest } from "fastify";
import { ListCitiesService } from "../../../services/cities/list-cities";
import { PrismaCitiesRepository } from "../../../repositories/prisma-cities-repository";

export async function listCities(_request: FastifyRequest, reply: FastifyReply) {
  try {
    const prismaCitiesRepository = new PrismaCitiesRepository()
    const listCitiesService = new ListCitiesService(prismaCitiesRepository)

    const cities = await listCitiesService.execute()

    return reply.status(200).send(cities)

  } catch (err) {
    throw err
  }
}