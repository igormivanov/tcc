import { NativeStackNavigationProp, createNativeStackNavigator } from "@react-navigation/native-stack"
import { RideFilter } from "@screens/RideFilter"
import { Home } from "@screens/Home"
import { Search } from "@screens/Search"
import { Ride } from '@screens/Ride';
import { FiltroInteresseRepublica } from "@screens/FiltroInteresseRepublica";
import { InteresseRepublica } from "@screens/InteresseRepublica";
import { CitySearch } from "@screens/CitySearch";
import { UserSearch } from "@screens/UserSearch";

export type HomeRoutesTypes = {
  homeScreen: undefined
  rideFilter: undefined
  search: undefined
  ride: undefined
  filtroInteresseRepublica: undefined
  interesseRepublica: undefined
  citySearch: {
    type: string
  }
  userSearchScreen: undefined
}

export type HomeNavigatorRoutesProps = NativeStackNavigationProp<HomeRoutesTypes>

const { Screen, Navigator} = createNativeStackNavigator<HomeRoutesTypes>()

export function HomeRoutes(){
  return (
    <Navigator screenOptions={{ headerShown: false }} >
      <Screen name="homeScreen" component={Home}/>
      <Screen name="rideFilter" component={RideFilter}/>
      <Screen name="ride" component={Ride}/>
      <Screen name="search" component={Search}/>
      <Screen name="filtroInteresseRepublica" component={FiltroInteresseRepublica}/>
      <Screen name="interesseRepublica" component={InteresseRepublica}/>
      <Screen name="citySearch" component={CitySearch}/>
      <Screen name="userSearchScreen" component={UserSearch}/>
    </Navigator>
  )
}