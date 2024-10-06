import { Follows, Prisma } from "@prisma/client";
import { UsersRepository } from "./interfaces/users-repository";
import { prisma } from "../lib/prisma";
import { compare, hash } from "bcryptjs";

export class PrismaUsersRepository implements UsersRepository{
  async updatePassword(userId: string, currentPassword: string, newPassword: string): Promise<void> {

    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })

    if(!user) {
      throw new Error()
    }

    const passwordMatch = await compare(currentPassword, user?.password_hash);

    if(!passwordMatch) {
      throw new Error()
    }

    const password_hash = await hash(newPassword, 6);

    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        password_hash
      }
    })
  }

  async updateEmail(userId: string, email: string): Promise<void> {
    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        email
      }
    })
  }

  async updateGeneral(userId: string, name: string, courseId: string, semester: number, tel: string): Promise<any> {

    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        name, courseId, semester, tel
      }
    })
  }

  async listFriends(userId: string): Promise<any> {
    const friends = await prisma.follows.findMany({
      where: {
        followedById: userId
      },
      include: {
        following: {
          select: {
            id: true,
            name: true,
            semester: true,
            course: {
              select: {
                name: true
              }
            }
          }
        }
      }
    })
    // return friends
    return friends.map(follow => follow.following)
  }

  async removeFriend(followingId: string, followedById: string): Promise<void> {
    await prisma.follows.deleteMany({
      where: {
        followingId: followingId,
        followedById: followedById
      }
    });
  }

  async addFriend(followingId: string, followedById: string): Promise<void> {
    await prisma.follows.create({
      data: { followingId: followingId, followedById: followedById },
    })
  }

  async updateInterests(userId: string, interestIds: string[]): Promise<void>{

    await prisma.userInterest.deleteMany({
      where: {
        userId: userId
      }
    })

    await prisma.userInterest.createMany({
      data: interestIds.map(id => ({
        userId: userId,
        interestId: id
      }))
    })
  }

  

  async findById(userId: string): Promise<any> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      },
      include: {
        course: true,
        interests: {
          select: {
            interest: {
              select: {
                name: true,
                id: true
              }
            }
          }
        },
        republicInterest: true,
        ride: true
      }
    })
    const {interests ,password_hash, ...userWithoutPassword} = user
    const formattedInterests = interests.map(userInterest => ({
      id: userInterest.interest.id,
      name: userInterest.interest.name
    }))

    return {...userWithoutPassword, interest: formattedInterests}
  
    // if (!user) {
    //   return null;
    // }

    // return {...user, republicInterest: user?.republicInterest || undefined, // Ajuste para garantir que republicInterest é `undefined` se não existir
    //   ride: user?.ride || undefined };
  }

  async findAll(){
    const users = await prisma.user.findMany({
      include: {
        course: true,
        interests: {
          select: {
            interest: {
              select: {
                name: true,
                id: true
              }
            }
          }
        },
        republicInterest: true,
        ride: true
      }
    })

    return users.map(user => {
      const { courseId, password_hash, interests,...userWithoutSensitiveData } = user
      const formattedInterests = interests.map(userInterest => ({
        id: userInterest.interest.id,
        name: userInterest.interest.name
      }))


      return {...userWithoutSensitiveData, interest: formattedInterests}
    })
    // return users.map(user => ({
    //   ...user,
    //   republicInterest: user.republicInterest || undefined, // Ajuste para garantir que republicInterest é `undefined` se não existir
    //   ride: user.ride || undefined,
    //   interest: user.interest || undefined // Ajuste para garantir que ride é `undefined` se não existir
    // }));
  }

  async findByEmail(email: string){
    const user = await prisma.user.findUnique({
      where: {
        email
      },
    })
    return user
  }

  async create(data: Prisma.UserCreateInput){
    const user = await prisma.user.create({
      data,
    })
    return user
  }
}