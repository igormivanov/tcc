import { User } from "@prisma/client";
import { hash } from "bcryptjs";
import { UsersRepository } from "../../repositories/interfaces/users-repository";
import { UserAlreadyExistsError } from "../errors/user-already-exists-error";
import { CoursesRepository } from "../../repositories/interfaces/courses-repository";

interface RegisterServiceRequest {
  name: string
  email: string
  semester: number
  password: string
  courseId: string
  tel: string
}


interface RegisterServiceResponse {
  user: User
}

export class RegisterService {
  constructor(private usersRepository: UsersRepository,
    private coursesRepository: CoursesRepository
  ) {}

  async execute({
    name,
    email,
    semester,
    password,
    courseId,
    tel
  }: RegisterServiceRequest): Promise<RegisterServiceResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)
    const courseValid = await this.coursesRepository.findById(courseId)

    if (courseValid == null) {
      throw new Error()
    }
    
    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }
    
    const user = await this.usersRepository.create({
      name,
      email,
      semester,
      password_hash,
      course: {
        connect: {id: courseValid.id}
      },
      tel
    })

    return { user }
  }
}