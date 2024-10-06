import { UsersRepository } from "../../repositories/interfaces/users-repository";

interface listFriendsServiceRequest {
  userId: string
}

interface listFriendsServiceResponse {
  friends: any[]
}

export class ListFriendsService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId
  }: listFriendsServiceRequest): Promise<listFriendsServiceResponse> {
   const friends = await this.usersRepository.listFriends(userId)
   return { friends }
  }
}