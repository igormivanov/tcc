import { Course, Prisma } from "@prisma/client";

export interface CoursesRepository {
  create(data: Prisma.CourseCreateInput): Promise<Course>
  findAll(): Promise<Course[]>
  findById(courseId: string): Promise<Course | null>
  remove(courseId: string): Promise<void>
}