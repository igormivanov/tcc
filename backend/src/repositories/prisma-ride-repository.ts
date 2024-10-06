import { Prisma, Course, Ride, TYPES } from "@prisma/client";
import { CoursesRepository } from "./interfaces/courses-repository";
import { prisma } from "../lib/prisma";
import { RideRepository } from "./interfaces/ride-repository";

export class PrismaRideRepository implements RideRepository {

  async findAll(origin: string, destination: string): Promise<any[]> {
    console.log(origin, destination)

    const rides = await prisma.ride.findMany({
      where: {  
        origin: origin,
        destination: destination
      },
      include: {
        user: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    return rides
  }
 
  

  async remove(userId: string): Promise<void> {
    await prisma.ride.delete({
      where: {
        user_id: userId
      }
    })
  }

  async create(userId: string, data: Prisma.RideCreateInput): Promise<Ride> {
    const ride = await prisma.ride.create({
      data: {
        origin: data.origin,
        destination: data.destination,
        passenger_limit: data.passenger_limit,
        user: {
          connect: { id: userId }
        }
      }
    })

    return ride
  }

  async findById(rideId: string): Promise<Ride | null> {
    const ride = await prisma.ride.findUnique({
      where: {
        id: rideId
      }
    })

    return ride;
  }

}