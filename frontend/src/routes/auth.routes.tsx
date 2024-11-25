import { NativeStackNavigationProp, createNativeStackNavigator } from "@react-navigation/native-stack"
import { Home } from "@screens/Home"
import { SignIn } from "@screens/SignIn"
import { SignUp } from "@screens/SignUp"
import { SignUp2 } from "@screens/SignUp2"

type AuthRoutes = {
  signIn: undefined
  signUp: undefined
  signUp2: {
    name: string,
    email: string,
    password: string
  },
  // homeScreen: undefined
}

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>

const { Screen, Navigator} = createNativeStackNavigator<AuthRoutes>()

export function AuthRoutes(){
  return (
    <Navigator screenOptions={{ headerShown: false }} >
      {/* <Screen name="homeScreen" component={Home}/> */}
      <Screen name="signIn" component={SignIn}/>
      <Screen name="signUp" component={SignUp}/>
      <Screen name="signUp2" component={SignUp2}/>
    </Navigator>
  )
}