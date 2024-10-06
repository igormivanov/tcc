import { Course, Ride} from "@prisma/client";
import { CoursesRepository } from "../../repositories/interfaces/courses-repository";
import { UsersRepository } from "../../repositories/interfaces/users-repository";
import { RideRepository } from "../../repositories/interfaces/ride-repository";

interface RemoveServiceRequest {
  userId: string
}

export class RemoveService {
  constructor(private rideRepository: RideRepository) {}

  async execute({
    userId,
  }: RemoveServiceRequest): Promise<void> {
    
    await this.rideRepository.remove(userId)
  }
}