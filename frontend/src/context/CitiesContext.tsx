import { createContext, ReactNode, SetStateAction, useState } from "react";
import { UserDTO } from '../dtos/UserDTO';
import { api } from "src/service/api";
import { useNavigation } from "@react-navigation/native";
import { City } from "@dtos/CityDTO";
import { AuthContext } from "./AuthContext";
import { CitySearch } from "@dtos/CitySearchDTO";

interface CityContextDataProps {
	cities: City[]
  getCities: () => Promise<void>
  setCitySearch: React.Dispatch<SetStateAction<CitySearch>>
  citySearch: CitySearch
}

interface CityContextProviderProps {
  children: ReactNode
}

export const CityContext = createContext<CityContextDataProps>({} as CityContextDataProps)


export function CityContextProvider({children}: CityContextProviderProps){

  const [cities, setCities] = useState<City[]>([])
  const [citySearch, setCitySearch] = useState<CitySearch>({} as CitySearch)

  async function getCities() {
    try {
      console.log("fui chamado no getCities")
      const { data } = await api.get('/cities')
      setCities(data.cities)
    } catch (err) {
      throw err
    }
  }


  return (  
    <CityContext.Provider
      value={{
        cities,
        getCities,
        setCitySearch,
        citySearch
      }}
    >
      {children}
    </CityContext.Provider>
  )
}