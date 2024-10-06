import { Course} from "@prisma/client";
import { CoursesRepository } from "../../repositories/interfaces/courses-repository";

interface CreateServiceRequest {
  name: string
  duration: number
}


interface CreateServiceResponse {
  course: Course
}

export class CreateService {
  constructor(private coursesRepository: CoursesRepository) {}

  async execute({
    name,
    duration
  }: CreateServiceRequest): Promise<CreateServiceResponse> {

    
    const course = await this.coursesRepository.create({name, duration})

    

    return { course }
  }
}