import { RepublicInterest, Ride, TYPES} from "@prisma/client";
import { RideRepository } from "../../repositories/interfaces/ride-repository";
import { RepublicInterestRepository } from "../../repositories/interfaces/republic-interest-repository";

interface ListRepublicInterestServiceResponse {
  republicInterests: RepublicInterest[]
}

interface listRidesServiceRequest {
  resident_limit?: number
  preferences?: TYPES
}

export class ListRepublicInterestService {
  constructor(private republicInterestRepository: RepublicInterestRepository) {}

  async execute({
    resident_limit,
    preferences
  }: listRidesServiceRequest): Promise<ListRepublicInterestServiceResponse> {
    const republicInterests = await this.republicInterestRepository.findAll(resident_limit, preferences)
    
    return { republicInterests }
  }
}