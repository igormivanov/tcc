import { Course, Prisma, RepublicInterest, TYPES } from "@prisma/client";

export interface RepublicInterestRepository {
  create(data: Prisma.RepublicInterestCreateInput): Promise<RepublicInterest>
  findAll(resident_limit?: number, preferences?: TYPES): Promise<RepublicInterest[]>
  findById(courseId: string): Promise<RepublicInterest | null>
  remove(userId: string): Promise<void>
}