import { Prisma, User, Interest, Follows } from '@prisma/client';
import { UserWithNewProperties } from "../../types/user";


export interface UsersRepository {
  findByEmail(email: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
  findAll(): Promise<any[]>
  findById(userId: string): Promise<any | null>
  updateInterests(userId: string, interestIds: string[]): Promise<void>
  addFriend(followingId: string, followedById: string): Promise<void>
  removeFriend(followingId: string, followedById: string): Promise<void>
  listFriends(userId: string): Promise<any>
  updateGeneral(userId: string, name: string, courseId: string, semester: number, tel: string): Promise<any>
  updateEmail(userId: string, email: string): Promise<void>
  updatePassword(userId: string, currentPassword: string, newPassword: string): Promise<void>
}