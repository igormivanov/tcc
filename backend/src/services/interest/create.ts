import { Course, Interest} from "@prisma/client";
import { CoursesRepository } from "../../repositories/interfaces/courses-repository";
import { InterestsRepository } from "../../repositories/interfaces/interests-repository";

interface CreateServiceRequest {
  name: string
}


interface CreateServiceResponse {
  interest: Interest
}

export class CreateService {
  constructor(private interestsRepository: InterestsRepository) {}

  async execute({
    name,
  }: CreateServiceRequest): Promise<CreateServiceResponse> {

    
    const interest = await this.interestsRepository.create({name})

    

    return { interest }
  }
}