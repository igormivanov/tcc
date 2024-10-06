import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./app.routes";
import { useTheme } from "native-base";
import { AuthRoutes } from "./auth.routes";
import { useAuth } from "@hooks/useAuth";

export function Routes(){

  const { colors } = useTheme()
  const { user } = useAuth()

  const theme = DefaultTheme
	// theme.colors.background = colors.white

  user.name ? theme.colors.background = colors.white : theme.colors.background = colors.green[300]

  return (
    <NavigationContainer theme={theme}>
      {/* <AppRoutes/> */}
      {/* <AuthRoutes/> */}
      {user.name ? <AppRoutes/> : <AuthRoutes/>}
    </NavigationContainer>
  )
}