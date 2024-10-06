import { Prisma, Course } from "@prisma/client";
import { CoursesRepository } from "./interfaces/courses-repository";
import { prisma } from "../lib/prisma";

export class PrismaCoursesRepository implements CoursesRepository {
  async remove(courseId: string): Promise<void> {
    await prisma.course.delete({
      where: {
        id: courseId
      }
    })
  }



  async create(data: Prisma.CourseCreateInput): Promise<Course> {
    const course = await prisma.course.create({
      data,
    })
    return course
  }
  async findAll(): Promise<Course[]> {
    const courses = await prisma.course.findMany()
    return courses
  }
  async findById(courseId: string): Promise<Course | null> {
    const course = await prisma.course.findUnique({
      where: {
        id: courseId
      }
    })

    return course;
  }


}