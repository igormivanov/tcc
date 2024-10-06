import { Prisma, Course, RepublicInterest, UserInterest, TYPES } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { RepublicInterestRepository } from "./interfaces/republic-interest-repository";

export class PrismaRepublicInterestRepository implements RepublicInterestRepository {
  async remove(userId: string): Promise<void> {
    await prisma.republicInterest.delete({
      where: {
        user_id: userId
      }
    })
  }


  async create(data: any): Promise<RepublicInterest> {

    const republicInterest = await prisma.republicInterest.create({
      data: {...data, user: {
        connect: {
          id: data.user.id
        }
      }}
    });
    
    return republicInterest
  }
  async findAll(resident_limit: number, preferences: TYPES): Promise<RepublicInterest[]> {
    const republicInterests = await prisma.republicInterest.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true
          }
        }
      },
      where: {
        resident_limit,
        preferences
      }
    })
    return republicInterests
  }
  async findById(republicInterestId: string): Promise<RepublicInterest | null> {
    const republicInterest = await prisma.republicInterest.findUnique({
      where: {
        id: republicInterestId
      }
    })

    return republicInterest;
  }

}