import { compare, hash } from "bcryptjs";
import { UsersRepository } from "../../repositories/interfaces/users-repository";

interface UpdatePasswordServiceRequest {
  userId: string
  currentPassword: string
  newPassword:string
}

export class UpdatePasswordService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
    currentPassword,
    newPassword,
  }: UpdatePasswordServiceRequest): Promise<void> {

    // const user = await this.usersRepository.findById(userId)
    // console.log(user)
    // const passwordMatch = await compare(currentPassword, user.password_hash);
    // console.log(passwordMatch)
    // if (!passwordMatch){
    //   throw new Error()
    // }

    // const password_hash = await hash(newPassword, 6);

    await this.usersRepository.updatePassword(userId, currentPassword, newPassword)
  }
}