import { UsersRepository } from "../../repositories/interfaces/users-repository";

interface UpdateGeneralServiceRequest {
  userId: string
  name: string,
  courseId: string,
  semester: number,
  tel: string
}

export class UpdateGeneralService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
    name,
    courseId,
    semester,
    tel
  }: UpdateGeneralServiceRequest): Promise<void> {
    
    await this.usersRepository.updateGeneral(userId, name, courseId, semester, tel)
  }
}