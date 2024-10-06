import { useContext } from "react";
import { RepublicInterestContext } from '../context/RepublicInterestContext';

export function useRepublicInterest(){
  const context = useContext(RepublicInterestContext);
  
  return context;
}