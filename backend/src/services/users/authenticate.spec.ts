import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUserRepository } from '../../repositories/in-memory/in-memory-users-repository'
import { AuthenticateService } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

let userRepository: InMemoryUserRepository
let authenticateService: AuthenticateService

describe('Authenticate Service', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    authenticateService = new AuthenticateService(userRepository)
  })

  it('should be able to authenticate', async () => {
    userRepository.create({
      cnpj: '12345678901234',
      crm: '12345678901235',
      email: 'igorauthenticate@gmail.com',
      name: "igor",
      password_hash: await hash('123456', 6),
    })

    const { user } = await authenticateService.execute({
      email: 'igorauthenticate@gmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      authenticateService.execute({
        email: 'igorauthenticate2@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    userRepository.create({
      cnpj: '12345678901234',
      crm: '12345678901235',
      email: 'igorauthenticate@gmail.com',
      name: "igor",
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      authenticateService.execute({
        email: 'igorauthenticate@gmail.com',
        password: '321321',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
