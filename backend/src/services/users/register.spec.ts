import { beforeEach, describe, expect, it, test } from 'vitest'
import { InMemoryUserRepository } from '../../repositories/in-memory/in-memory-users-repository'
import { RegisterService } from './register'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'

let userRepository: InMemoryUserRepository
let registerService: RegisterService

describe('Register Service', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    registerService = new RegisterService(userRepository)
  })

  it('Should be able to register', async () => {
    const { user } = await registerService.execute({
      cnpj: '12345678901234',
      crm: '12345678901235',
      email: 'igor@gmail.com',
      name: "igor",
      password: "123456",
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await registerService.execute({
      cnpj: '12345678901234',
      crm: '12345678901235',
      email: 'igor@gmail.com',
      name: "igor",
      password: "123456",
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash
    )

    expect(isPasswordCorrectlyHashed).toBe(true)

  })

  it('should not be able to register with same email twice', async () => {
    const email = 'emailduplicado@gmail.com'

    await registerService.execute({
      cnpj: '12345678901234',
      crm: '12345678901235',
      email,
      name: "igor",
      password: "123456",
    })

    await expect(() =>
      registerService.execute({
        cnpj: '12345678901234',
        crm: '12345678901235',
        email,
        name: "igor2",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})