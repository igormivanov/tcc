import { Course} from "@prisma/client";
import { CoursesRepository } from "../../repositories/interfaces/courses-repository";

interface ListCoursesServiceResponse {
  courses: Course[]
}

export class ListCoursesService {
  constructor(private coursesRepository: CoursesRepository) {}

  async execute(): Promise<ListCoursesServiceResponse> {
    const courses = await this.coursesRepository.findAll()
    return { courses }
  }
}