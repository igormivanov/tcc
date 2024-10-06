import {
	BottomTabNavigationProp,
	createBottomTabNavigator
} from '@react-navigation/bottom-tabs'
import { useTheme } from 'native-base'
import { Platform } from 'react-native'
import { Home } from '@screens/Home'
import { Profile } from '@screens/Profile'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { UserSearch } from '@screens/UserSearch'
import { Search } from '@screens/Search'
import { Settings } from '@screens/Settings'
import { ProfileRoutes } from './profile.routes'
import { UserSearchRoutes } from './userSearch.routes'
import { HomeRoutes } from './home.routes'

type AppRoutes = {
	home: undefined
	profile: undefined
  userSearch: undefined
	search: undefined
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

export function AppRoutes() {
	const { sizes, colors } = useTheme()

	const iconSize = sizes[6]

	return (
		<Navigator
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarActiveTintColor: colors.gray[200],
				tabBarInactiveTintColor: colors.green[500],
				tabBarStyle: {
					backgroundColor: colors.green[300],
					borderTopWidth: 0,
					height: Platform.OS === 'android' ? 96 : 96,
					paddingBottom: sizes[9],
					paddingTop: sizes[7]
				}
			}}
		>
			<Screen
				name="home"
				component={HomeRoutes}
				options={{
					tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={iconSize} color={color} />
					)
				}}
			/>

      <Screen
				name="userSearch"
				component={UserSearchRoutes}
				options={{
					tabBarIcon: ({ color }) => (
						<FontAwesome name="search" size={iconSize} color={color} />
					)
				}}
			/>

			<Screen
				name="profile"
				component={ProfileRoutes}
				options={{
					tabBarIcon: ({ color }) => (
						<FontAwesome name="user" size={iconSize} color={color} />
					)
				}}
			/>

		</Navigator>
	)
}