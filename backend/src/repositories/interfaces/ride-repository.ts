import { Course, Prisma, Ride, TYPES } from "@prisma/client";

export interface RideRepository {
  create(userId: string, data: Prisma.RideCreateInput): Promise<Ride>
  remove(userId: string): Promise<void>
  findAll(origin?: string, destination?: string): Promise<any[]>
  findById(rideId: string): Promise<Ride| null>
}