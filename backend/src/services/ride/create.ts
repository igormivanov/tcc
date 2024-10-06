import { Course, Ride} from "@prisma/client";
import { CoursesRepository } from "../../repositories/interfaces/courses-repository";
import { UsersRepository } from "../../repositories/interfaces/users-repository";
import { RideRepository } from "../../repositories/interfaces/ride-repository";

interface CreateServiceRequest {
  userId: string
  origin: string
  destination: string
  passenger_limit: number
}


interface CreateServiceResponse {
  ride: Ride
}

export class CreateService {
  constructor(private rideRepository: RideRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    userId,
    origin,
    destination,
    passenger_limit
  }: CreateServiceRequest): Promise<CreateServiceResponse> {

    const user = await this.usersRepository.findById(userId)
    
    const ride = await this.rideRepository.create(userId,{
      destination,
      origin,
      passenger_limit,
      user: user
    })

    return { ride }
  }
}