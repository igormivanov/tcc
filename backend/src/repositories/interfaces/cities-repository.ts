import { City, Course, Prisma } from "@prisma/client";

export interface CitiesRepository {
  findAll(): Promise<City[]>
  // findById(courseId: string): Promise<Course | null>
  // remove(courseId: string): Promise<void>
}