import { beforeEach, describe, expect, it, test } from 'vitest'
import { InMemoryUserRepository } from '../../repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'
import { ListUsersService } from './list-users'

let userRepository: InMemoryUserRepository
let listUsersService: ListUsersService

describe('List Users Service', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    listUsersService = new ListUsersService(userRepository)
  })

  it('Should be able to list all users', async () => {

    await userRepository.create({
      cnpj: '12345678901234',
      crm: '12345678901235',
      email: 'igor@gmail.com',
      name: "igor",
      password_hash: "123456",
    })

    await userRepository.create({
      cnpj: '12345678901234',
      crm: '12345678901235',
      email: 'igor2@gmail.com',
      name: "igor",
      password_hash: "123456",
    })


    const { users } = await listUsersService.execute()

    expect(users).toHaveLength(2)
    expect(users).toEqual([
      expect.objectContaining({email: 'igor@gmail.com'}),
      expect.objectContaining({email: 'igor2@gmail.com',})
    ])
  })

  
})