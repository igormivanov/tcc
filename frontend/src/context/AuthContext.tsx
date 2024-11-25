import { createContext, ReactNode, SetStateAction, useState } from "react";
import { UserDTO } from '../dtos/UserDTO';
import { api } from "src/service/api";
import { useNavigation } from "@react-navigation/native";

interface AuthContextDataProps {
	user: UserDTO
  token: string
	signIn: (email: string, password: string) => Promise<void>
  findUserById: (userId?: string) => Promise<UserDTO | void>
	signOut: () => Promise<void>
  setUser: React.Dispatch<SetStateAction<UserDTO>>
  emailChange: (email: string) => Promise<void>
  passwordChange: (currentPassword: string, newPassword: string) => Promise<void>

}

interface AuthContextProviderProps {
  children: ReactNode
}

type sessionsResponseData = {
  token: string,
  userName: string
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps)


export function AuthContextProvider({children}: AuthContextProviderProps){

  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [token, setToken] = useState('')

  async function passwordChange(currentPassword: string, newPassword: string) {
    try {
      await api.post('/users/update-password', {currentPassword, newPassword}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    } catch (err) {
      throw err
    }
  }

  async function emailChange(email: string) {
    try {
      await api.post('/users/update-email', {email}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    } catch (err) {
      throw err
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const response = await api.post('/sessions', {email, password})
      console.log(response.data)
      if(response.data.token && response.data.userName) {
        setUser({...user, name: response.data.userName})
        setToken(response.data.token)
        console.log("token: " + response.data.token)
      } 
    } catch (err) {
      throw err
    }
  }

  async function findUserById(userId?: string) {
    try {
      if(!token) {
        return
      }

      const { data } = await api.get(userId ? `/user/${userId}` : '/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      
      if (!userId) {
        setUser({...user, 
          id: data.user.id,
          course: data.user.course,
          email: data.user.email,
          name: data.user.name,
          semester: data.user.semester,
          tel: data.user.tel,
          photo: data.user.image,
          interests: data.user.interest,
          republicInterest: data.user.republicInterest,
          ride: data.user.ride
        })
        return
      }
      return data.user
    } catch (err) {
      throw err
    }
  }

  async function signOut() {
    setToken('')
    setUser({})
  }


  return (  
    <AuthContext.Provider
      value={{
        signIn,
        user,
        signOut,
        findUserById,
        token,
        setUser,
        emailChange,
        passwordChange
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}