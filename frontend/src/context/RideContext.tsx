import { createContext, ReactNode, SetStateAction, useState } from "react";
import { UserDTO } from '../dtos/UserDTO';
import { api } from "src/service/api";
import { useNavigation } from "@react-navigation/native";
import { City } from "@dtos/CityDTO";
import { AuthContext } from "./AuthContext";
import { CitySearch } from "@dtos/CitySearchDTO";
import { RideDTO } from "@dtos/RideDTO";
import { useAuth } from "@hooks/useAuth";

interface CityContextDataProps {
	rides: RideDTO[]
  getRides: (origin: string, destination: string) => Promise<void>
  deleteRide: () => Promise<void>
  createRide: (origin: string, destination: string, passenger_limit: number) => Promise<void>
}

interface RideContextProviderProps {
  children: ReactNode
}

export const RideContext = createContext<CityContextDataProps>({} as CityContextDataProps)


export function RideContextProvider({children}: RideContextProviderProps){

  const [rides, setRides] = useState<RideDTO[]>([])
  const {token} = useAuth()

  async function deleteRide() {
    try {
      await api.delete('/rides', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log("Carona excluída")
    } catch (err) {
      throw err
    }
  }

  async function createRide(origin: string, destination: string, passenger_limit: number){
    try {
      await api.post('/rides', {
        origin,
        destination,
        passenger_limit,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      
    )
    console.log("carona criada")
    } catch (err) {
      throw err
    }
  }

  async function getRides(origin: string, destination: string) {
    try {
      const { data } = await api.get('/rides', {
        params: {
          origin,
          destination
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(data)
      setRides(data.rides)
    } catch (err) {
      throw err
    }
  }


  return (  
    <RideContext.Provider
      value={{
        rides,
        getRides,
        deleteRide,
        createRide
      }}
    >
      {children}
    </RideContext.Provider>
  )
}