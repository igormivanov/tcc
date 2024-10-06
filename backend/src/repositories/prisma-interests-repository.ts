import { Prisma, Course, Interest } from "@prisma/client";
import { CoursesRepository } from "./interfaces/courses-repository";
import { prisma } from "../lib/prisma";
import { InterestsRepository } from "./interfaces/interests-repository";

export class PrismaInterestsRepository implements InterestsRepository {
  async create(data: Prisma.InterestCreateInput): Promise<Interest> {
    const interest = await prisma.interest.create({
      data,
    })
    return interest
  }
  async findAll(): Promise<Interest[]> {
    const interests = await prisma.interest.findMany()
    return interests
  }
  async findById(interestId: string): Promise<Interest | null> {
    const interest = await prisma.interest.findUnique({
      where: {
        id: interestId
      }
    })

    return interest;
  }

}