import { Ride, TYPES} from "@prisma/client";
import { RideRepository } from "../../repositories/interfaces/ride-repository";

interface listRidesServiceResponse {
  rides: Ride[]
}

interface listRidesServiceRequest {
  origin?: string
  destination?: string
}

export class ListRidesService {
  constructor(private rideRepository: RideRepository) {}

  async execute({
    origin,
    destination  
  }: listRidesServiceRequest): Promise<listRidesServiceResponse> {
    const rides = await this.rideRepository.findAll(origin, destination)
    return { rides }
  }
}