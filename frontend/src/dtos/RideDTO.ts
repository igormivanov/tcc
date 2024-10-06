import { UserDTO } from "./UserDTO"

export type RideDTO = {
  id: string,
  origin: string,
  destination: string,
  passenger_limit: number,
  userId: string,
  userName: string
  user: UserDTO
}