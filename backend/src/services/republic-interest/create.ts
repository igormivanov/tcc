import { Course, Interest, RepublicInterest, TYPES, $Enums } from '@prisma/client';
import { CoursesRepository } from "../../repositories/interfaces/courses-repository";
import { InterestsRepository } from "../../repositories/interfaces/interests-repository";
import { RepublicInterestRepository } from "../../repositories/interfaces/republic-interest-repository";
import { UsersRepository } from '../../repositories/interfaces/users-repository';

interface CreateServiceRequest {
  resident_limit: number
  preferences: TYPES
  userId: string
}


interface CreateServiceResponse {
  republicInterest: RepublicInterest
}

export class CreateService {
  constructor(private republicInterestRepository: RepublicInterestRepository,
    private usersRepository: UsersRepository) {}

  async execute({
    resident_limit,
    preferences,
    userId
  }: CreateServiceRequest): Promise<CreateServiceResponse> {

    const user = await this.usersRepository.findById(userId)
    
    const republicInterest = await this.republicInterestRepository.create({resident_limit, preferences, user})

    

    return { republicInterest }
  }
}