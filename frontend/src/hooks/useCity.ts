import { useContext } from "react";
import { AuthContext } from "src/context/AuthContext";
import { CityContext } from "src/context/CitiesContext";

export function useCity(){
  const context = useContext(CityContext);
  
  return context;
}