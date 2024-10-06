import { UsersRepository } from "../../repositories/interfaces/users-repository";

interface RemoveFriendServiceRequest {
  followingId: string
  followedById: string
}

export class RemoveFriendService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    followingId,
    followedById
  }: RemoveFriendServiceRequest): Promise<void> {
    
    await this.usersRepository.removeFriend(followingId, followedById)
  }
}