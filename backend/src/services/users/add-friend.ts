import { UsersRepository } from "../../repositories/interfaces/users-repository";

interface AddFriendServiceRequest {
  followingId: string
  followedById: string
}

export class AddFriendService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    followingId,
    followedById
  }: AddFriendServiceRequest): Promise<void> {
    
    await this.usersRepository.addFriend(followingId, followedById)
  }
}