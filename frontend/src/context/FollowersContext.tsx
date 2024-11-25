import { createContext, ReactNode, SetStateAction, useState } from "react";
import { UserDTO } from '../dtos/UserDTO';
import { api } from "src/service/api";
import { useNavigation } from "@react-navigation/native";
import { City } from "@dtos/CityDTO";
import { AuthContext } from "./AuthContext";
import { CitySearch } from "@dtos/CitySearchDTO";
import { useAuth } from "@hooks/useAuth";
import { FollowerDTO } from "@dtos/FollowerDTO";

interface FollowersContextDataProps {
  userFollowers: FollowerDTO[]
  getUserFollowers: () => Promise<void>
  removeFollower: (followingId: string) => Promise<void>
  Follow: (followingId: string) => Promise<void>
}

interface FollowersContextProviderProps {
  children: ReactNode
}

export const FollowerContext = createContext<FollowersContextDataProps>({} as FollowersContextDataProps)


export function FollowerContextProvider({children}: FollowersContextProviderProps){

  const {token} = useAuth()

  const [userFollowers, setUserFollowers] = useState<FollowerDTO[]>([])

  async function getUserFollowers() {
    try {
      const {data} = await api.get('/users/list-friends', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setUserFollowers(data.friends)

    } catch (err) {
      console.log(err)
    }
  }

  async function removeFollower(followingId: string) {
    try {
      await api.delete(`/users/remove-friends/${followingId}`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setUserFollowers(prevFollowers => prevFollowers.filter(follower => follower.id != followingId))
    } catch (err) {
      console.log(err)
    }
  }

  async function Follow(followingId: string) {
    try {
      await api.post('/users/add-friends',{
        followingId
      },{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      await getUserFollowers()
    } catch (err) {
      console.log(err)
    }
  }


  return (  
    <FollowerContext.Provider
      value={{userFollowers, getUserFollowers, Follow, removeFollower}}
    >
      {children}
    </FollowerContext.Provider>
  )
}