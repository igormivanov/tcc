import { User } from "@prisma/client";
import { UsersRepository } from "../../repositories/interfaces/users-repository";

interface GetUserServiceRequest {
  id: string
}

interface GetUserServiceResponse {
  user: User
}

export class GetUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id
  }: GetUserServiceRequest): Promise<GetUserServiceResponse> {
   const user = await this.usersRepository.findById(id)
   return { user }
  }
}