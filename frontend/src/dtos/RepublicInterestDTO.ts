import { TYPES } from "./TypesDTO"

export type RepublicInterestDTO = {
  id: string,
  resident_limit: number,
  preferences: TYPES,
  user: {
    id: string,
    name: string
  }
}