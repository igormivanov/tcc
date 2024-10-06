import { City, RepublicInterest, Ride, TYPES} from "@prisma/client";
import { RideRepository } from "../../repositories/interfaces/ride-repository";
import { RepublicInterestRepository } from "../../repositories/interfaces/republic-interest-repository";
import { CitiesRepository } from "../../repositories/interfaces/cities-repository";

interface ListCitiesServiceResponse {
  cities: City[]
}

export class ListCitiesService {
  constructor(private citiesRepository: CitiesRepository) {}

  async execute(): Promise<ListCitiesServiceResponse> {
    const cities = await this.citiesRepository.findAll()
    
    return { cities }
  }
}