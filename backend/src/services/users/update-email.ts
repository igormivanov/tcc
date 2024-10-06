import { UsersRepository } from "../../repositories/interfaces/users-repository";

interface UpdateEmailServiceRequest {
  userId: string
  email: string
}

export class UpdateEmailService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
    email
  }: UpdateEmailServiceRequest): Promise<void> {
    
    await this.usersRepository.updateEmail(userId, email)
  }
}