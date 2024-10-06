import { CoursesRepository } from "../../repositories/interfaces/courses-repository";

interface RemoveServiceRequest {
  courseId: string
}

export class RemoveService {
  constructor(private coursesRepository: CoursesRepository) {}

  async execute({
    courseId,
  }: RemoveServiceRequest): Promise<void> {
    
    await this.coursesRepository.remove(courseId)
  }
}