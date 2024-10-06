import { MaterialIcons } from '@expo/vector-icons'
import { HStack, Heading, Icon, Text, VStack } from 'native-base'
import { TouchableOpacity } from 'react-native'

// import { api } from '@services/api'

// import { useAuth } from '@hooks/useAuth'

import defaulUserPhotoImgs from '@assets/userPhotoDefault.png'
import { UserPhoto } from './UserPhoto'

export function HomeHeader() {
	// const { user, signOut } = useAuth()

	return (
		<HStack bg="green.300" pt={16} pb={5} px={8} alignItems="center">
			<UserPhoto
				source={defaulUserPhotoImgs}
				size={16}
				alt="Imagem do usuário"
				mr={4}
			/>
			<VStack flex={1}>
				<Text color="gray.100" fontSize="md">
					Olá,
				</Text>
				<Heading color="gray.100" fontSize="md" fontFamily="heading">
					Igor Ivanov
				</Heading>
			</VStack>
			<TouchableOpacity>
				<Icon as={MaterialIcons} name="logout" color="gray.200" size={7} />
			</TouchableOpacity>
		</HStack>
	)
}