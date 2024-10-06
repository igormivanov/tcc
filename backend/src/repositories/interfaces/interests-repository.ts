import { Interest, Prisma, TYPES } from "@prisma/client";

export interface InterestsRepository {
  create(data: Prisma.InterestCreateInput): Promise<Interest>
  findAll(): Promise<Interest[]>
  findById(interestId: string): Promise<Interest | null>
}