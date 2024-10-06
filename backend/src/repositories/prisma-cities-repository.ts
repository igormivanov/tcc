import { Prisma, Course, City } from "@prisma/client";
import { CoursesRepository } from "./interfaces/courses-repository";
import { prisma } from "../lib/prisma";
import { CitiesRepository } from "./interfaces/cities-repository";

export class PrismaCitiesRepository implements CitiesRepository {
  async findAll(): Promise<City[]> {
    const cities = await prisma.city.findMany()

    return cities
  }
  


}