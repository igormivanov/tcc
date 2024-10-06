import { NativeStackNavigationProp, createNativeStackNavigator } from "@react-navigation/native-stack"
import { UserSearch } from "@screens/UserSearch"
import { Search } from "@screens/Search"
import { UserSearchProfile } from '../screens/UserSearchProfile';

export type UserSearchRoutesTypes = {
  userSearchScreen: undefined
  search: undefined
  UserSearchProfile: {
    userId: string
  }
}

export type UserSearchNavigatorRoutesProps = NativeStackNavigationProp<UserSearchRoutesTypes>

const { Screen, Navigator} = createNativeStackNavigator<UserSearchRoutesTypes>()

export function UserSearchRoutes(){
  return (
    <Navigator screenOptions={{ headerShown: false }} >
      <Screen name="userSearchScreen" component={UserSearch}/>
      <Screen name="search" component={Search}/>
      <Screen name="UserSearchProfile" component={UserSearchProfile} />
    </Navigator>
  )
}