import { useContext } from "react";
import { FollowerContext } from "src/context/FollowersContext";

export function useFollower(){
  const context = useContext(FollowerContext);
  
  return context;
}