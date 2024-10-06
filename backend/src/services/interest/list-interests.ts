import { Interest} from "@prisma/client";
import { InterestsRepository } from "../../repositories/interfaces/interests-repository";

interface ListInterestsServiceResponse {
  interests: Interest[]
}

export class ListInterestsService {
  constructor(private interestsRepository: InterestsRepository) {}

  async execute(): Promise<ListInterestsServiceResponse> {
    const interests = await this.interestsRepository.findAll()
    return { interests }
  }
}