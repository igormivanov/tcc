import { UsersRepository } from "../../repositories/interfaces/users-repository";

interface UpdateInterestsServiceRequest {
  userId: string
  interestIds: string[]
}

export class UpdateInterestsService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
    interestIds
  }: UpdateInterestsServiceRequest): Promise<void> {
    
    await this.usersRepository.updateInterests(userId, interestIds)
  }
}