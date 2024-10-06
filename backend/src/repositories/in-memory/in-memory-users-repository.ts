import { $Enums, Prisma, User } from "@prisma/client";
import { UsersRepository } from "../interfaces/users-repository";
import { randomUUID } from "crypto";

export class InMemoryUserRepository implements UsersRepository {
  public items: User[] = []

  async findByEmail(email: string){
    const user = this.items.find((item) => item.email === email)
    if (!user) {
      return null
    }
    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user: User = {
      id: randomUUID(),
      cnpj: data.cnpj,
      crm: data.crm,
      name: data.name,
      created_at: new Date(),
      email: data.email,
      password_hash: data.password_hash,
      role: "DOCTOR"
    }

    this.items.push(user)
    return user
  }

  async findAll() {
    return this.items
  }

  async findById(userId: string) {
    const user = this.items.find((item) => item.id === userId)
    if (!user) {
      return null
    }
    return user
  }

}