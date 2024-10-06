import { User } from "@prisma/client";
import { UsersRepository } from "../../repositories/interfaces/users-repository";
import { UserDTO, UserWithNewProperties } from "../../types/user";

// interface ListUsersServiceResponse {
//   response: UserDTO[]
// }

interface ListUsersServiceResponse {
  users: User[]
}

export class ListUsersService {

  constructor(private usersRepository: UsersRepository) {}

  mapToUserDTO(users: UserWithNewProperties[]) {
    const dto = users.map(user => ({
      name: user.name,
      email: user.email,
      semester: user.semester,
      tel: user.tel,
      course: {
        name: user.course.name,
        duration: user.course.duration
      },
      interests: user.interests,
      republicInterest: user.republicInterest,
      ride: user.ride
    }))
    return dto
  }

  async execute(): Promise<ListUsersServiceResponse> {
    const users = await this.usersRepository.findAll()
    // console.log(users.map(user => user.interests))
    // const response = this.mapToUserDTO(users)


    return { users }
  }
}