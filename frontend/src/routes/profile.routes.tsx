import { NativeStackNavigationProp, createNativeStackNavigator } from "@react-navigation/native-stack"
import { EmailChange } from "@screens/EmailChange"
import { Profile } from "@screens/Profile"
import { ProfilePreferences } from "@screens/ProfilePreferences"
import { PasswordChange } from "@screens/PasswordChange"
import { Settings } from "@screens/Settings"
import { RideCreation } from "@screens/RideCreation"
import { UsuarioInteresseRepublica } from "@screens/UsuarioInteresseRepublica"
import { CitySearch } from "@screens/CitySearch"
import { SignIn } from "@screens/SignIn"
import { UserRide } from "@screens/UserRide"
import { UsuarioInteresseRepublica1 } from "@screens/UsuarioInteresseRepublica1"
import { UserInterest } from "@screens/UserInterest"

export type ProfileRoutes = {
  profileScreen: undefined
  settings: undefined
  preferences: undefined
  security: undefined
  emailChange: undefined
  passwordChange: undefined
  rideCreation: undefined
  usuarioInteresseRepublica: undefined
  usuarioInteresseRepublica1: undefined
  citySearch: {
    type: string
  }
  signIn: undefined,
  userRide: undefined
  userInterest: undefined
}

export type ProfileNavigatorRoutesProps = NativeStackNavigationProp<ProfileRoutes>

const { Screen, Navigator} = createNativeStackNavigator<ProfileRoutes>()

export function ProfileRoutes(){
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="profileScreen">
      <Screen name="profileScreen" component={Profile}/>
      <Screen name="settings" component={Settings}/>
      <Screen name="preferences" component={ProfilePreferences}/>
      <Screen name="passwordChange" component={PasswordChange} />
      <Screen name="emailChange" component={EmailChange} />
      <Screen name="rideCreation" component={RideCreation}/>
      <Screen name="usuarioInteresseRepublica" component={UsuarioInteresseRepublica} />
      <Screen name="citySearch" component={CitySearch}  />
      <Screen name="signIn" component={SignIn} />
      <Screen name="userRide" component={UserRide}/>
      <Screen name="usuarioInteresseRepublica1" component={UsuarioInteresseRepublica1}/>
      <Screen name="userInterest" component={UserInterest}/>
    </Navigator>
  )
}