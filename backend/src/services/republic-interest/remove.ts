import { Course, Ride} from "@prisma/client";
import { CoursesRepository } from "../../repositories/interfaces/courses-repository";
import { UsersRepository } from "../../repositories/interfaces/users-repository";
import { RideRepository } from "../../repositories/interfaces/ride-repository";
import { RepublicInterestRepository } from "../../repositories/interfaces/republic-interest-repository";

interface RemoveServiceRequest {
  userId: string
}

export class RemoveService {
  constructor(private republicInterestRepository: RepublicInterestRepository) {}

  async execute({
    userId,
  }: RemoveServiceRequest): Promise<void> {
    
    await this.republicInterestRepository.remove(userId)
  }
}