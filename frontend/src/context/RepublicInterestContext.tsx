import { createContext, ReactNode, SetStateAction, useState } from "react";
import { UserDTO } from '../dtos/UserDTO';
import { api } from "src/service/api";
import { useNavigation } from "@react-navigation/native";
import { City } from "@dtos/CityDTO";
import { AuthContext } from "./AuthContext";
import { CitySearch } from "@dtos/CitySearchDTO";
import { RideDTO } from "@dtos/RideDTO";
import { useAuth } from "@hooks/useAuth";
import { RepublicInterestDTO } from "@dtos/RepublicInterestDTO";

interface RepublicInterestContextDataProps {
	republicInterest: RepublicInterestDTO[]
  getRepublicInterests: (resident_limit: number, preferences: string) => Promise<void>
  deleteRepublicInterest: () => Promise<void>
  createRepublicInterest: (resident_limit: number, preferences: string) => Promise<void>
}

interface RepublicInterestContextProviderProps {
  children: ReactNode
}

export const RepublicInterestContext = createContext<RepublicInterestContextDataProps>({} as RepublicInterestContextDataProps)


export function RepublicInterestContextProvider({children}: RepublicInterestContextProviderProps){

  const [republicInterest, setRepublicInterest] = useState<RepublicInterestDTO[]>([])
  const {token} = useAuth()

  async function getRepublicInterests(resident_limit: number, preferences: string) {
    try {
      const { data } = await api.get('/republic-interest', {
        params: {
          resident_limit,
          preferences
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setRepublicInterest(data.republicInterests)
    } catch (err) {
      throw err
    }
  }

  async function deleteRepublicInterest(){
    try {
      await api.delete('/republic-interest',{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    } catch (err) {
      throw err
    }
  }

  async function createRepublicInterest(resident_limit: number, preferences: string){
    try {
      await api.post('/republic-interest',{
        resident_limit,
        preferences
      },{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    } catch (err) {
      throw err
    }
  }


  return (  
    <RepublicInterestContext.Provider
      value={{
        republicInterest,
        getRepublicInterests,
        deleteRepublicInterest,
        createRepublicInterest
      }}
    >
      {children}
    </RepublicInterestContext.Provider>
  )
}