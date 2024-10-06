import { useContext } from "react";
import { RideContext } from "src/context/RideContext";

export function useRide(){
  const context = useContext(RideContext)
  return context
}