// import { yupResolver } from '@hookform/resolvers/yup'
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import {
	Badge,
	Box,
	Container,
	Divider,
	HStack,
	Heading,
	ScrollView,
	SimpleGrid,
	Skeleton,
	Text,
	VStack,
	useToast,
	Button,
	Spinner,
  Center
} from 'native-base'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { SafeAreaView, TouchableOpacity } from 'react-native'
// import * as yup from 'yup'

// import { useAuth } from '@hooks/useAuth'

// import { api } from '@services/api'
// import { AppError } from '@utils/AppError'

import defaulUserPhotoImg from '@assets/userPhotoDefault.png'

// import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { ScreenHeader } from '@components/ScreenHeader'
import { UserPhoto } from '@components/UserPhoto'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '@hooks/useAuth'
import { Loading } from '@components/Loading'
import { userNameFormatter } from '@utils/UserNameFormatter'
import { ProfileNavigatorRoutesProps } from 'src/routes/profile.routes'
import { UserDTO } from '@dtos/UserDTO'
import { useFollower } from '@hooks/useFollower'

const PHOTO_SIZE = 98

type FormDataProps = {
	name: string
	email: string
	password: string
	old_password: string
	confirm_password: string
}

export function UserSearchProfile({route}) {
	const [isUpdating, setIsUpdating] = useState(false)
	const [photoIsLoading, setPhotoIsLoading] = useState(false)
	const [userPhoto, setUserPhoto] = useState('https://github.com/mgckaled.png')

	const toast = useToast()
	const navigation = useNavigation<ProfileNavigatorRoutesProps>()
	const { user, findUserById} = useAuth()

	const [loading, setLoading] = useState(false)
  const [userFounded, setUserFounded] = useState<UserDTO>()
	const {userFollowers, Follow, removeFollower} = useFollower()

	useEffect(() => {
		const userProfileHandler = async () => {
			try {
          setLoading(true)
					const user = await findUserById(route.params.userId)
          if (user) {
            setUserFounded(user)
          } 
			} catch (err) {
				throw err
			} finally {
        setLoading(false)
        console.log(userFounded)
      }
		}
		userProfileHandler()
	}, [])

	const republicPreferencesRender = (preferences: string): string => {
		switch (preferences) {
			case 'ANYONE':
        return "Dividir com Ambos gêneros"
      case 'MAN':
        return "Dividir com Homens"
      case 'WOMAN':
        return "Dividir com Mulheres";
      default:
        return ""
		}	 
	}

	// console.log(user.id)
	const userNameFormatted = userNameFormatter(userFounded?.name)

	const IsFollower = ()  => {
		return userFollowers.some(follower => follower.id == userFounded?.id)
	}

	const handleFollower = async (isFollower: boolean) => {
		console.log("handle")
		if (isFollower) {
			console.log("entrei")
			await removeFollower(userFounded!.id)
			return
		}
		console.log("vou dar follow")
		await Follow(userFounded!.id)
	}

	return (
		<SafeAreaView >
			{/* <ScreenHeader title="" /> */}
      <HStack justifyContent="space-between" my={2} alignItems="center">
        <Button variant="unstyled" onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" size={18}/>
        </Button>
        <Button onPress={() => handleFollower(IsFollower())} variant="unstyled" mr={3}>
          <FontAwesome name={IsFollower() ? "star" : "star-o"}  style={{color: "gray.100"}} size={18}/>
        </Button>
      </HStack>
      {/* <Divider/> */}
			
				{loading ? <Center flex={1}><Spinner color="green.500"/></Center> : 
					<>
					<ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
						<VStack>
              <Center mt={4}>
                {photoIsLoading ? (
                  <Skeleton
                    w={PHOTO_SIZE}
                    h={PHOTO_SIZE}
                    rounded="full"
                    startColor="gray.500"
                    endColor="gray.400"
                  />
                  ) : (
                    <UserPhoto
                      source={defaulUserPhotoImg}
                      alt="Foto do usuário"
                      size={PHOTO_SIZE}
                    />
                  )}
                <Text mt={5} fontSize="md" bold>{userNameFormatted}</Text>
                <Text mt={2} fontSize="sm">{userFounded?.course.name} - {userFounded?.semester}° semestre</Text>
                {/* <Button mt={3} title="Editar perfil" width={26} height={10} px={2} bg="green.300">teste</Button> */}
                {/* <Button mt={3} w="80%" size="sm" bg="green.300" onPress={() => navigation.navigate("settings")}>Adicionar</Button> */}
              </Center>
            </VStack>
            {/* <VStack ml={5} pt={2}>
              
						</VStack> */}

						<VStack space={3} mx={5} px={3} mt={10} mb={10}>
							{/* <HStack justifyContent="space-between" p={3} background="gray.100" borderRadius={8}>
								<Text  pr={10}>E-mail</Text>
								<Text >{userFounded?.email}</Text>
							</HStack> */}
							<HStack justifyContent="space-between" p={3} background="gray.100" borderRadius={8}>
								<Text  pr={10}>Telefone</Text>
								<Text >{userFounded?.tel}</Text>
							</HStack>
							<HStack justifyContent="space-between" p={3} background="gray.100" borderRadius={8}>
								<Text  pr={10}>Aluguel</Text>
								<Text >
									{!userFounded?.republicInterest ? 'Não cadastrado' :
										republicPreferencesRender(userFounded?.republicInterest.preferences.toString())  + ' / ' + userFounded?.republicInterest.resident_limit
									}
								</Text>
							</HStack>
							<HStack justifyContent="space-between" p={3} background="gray.100" borderRadius={8}>
								<Text>Carona</Text>
								<Text  >
									{userFounded?.ride ? 
											userFounded?.ride.origin + ' > ' + userFounded?.ride.destination :
											'Não cadastrado'
									}
								</Text>
							</HStack>
						</VStack>

						<Center>
              <Divider w="70%"/>	
            </Center>	

						<Center mt={5}>
							<Text fontSize={"md"}>Interesses</Text>
						</Center>

			
						<HStack justifyContent="center" flexWrap="wrap">
							
							{userFounded?.interest?.map(interest => (
									<Badge key={interest.id} minW="30%" variant="solid" p={1} mt={2} mb={2} mr={2} >{interest.name}</Badge>
							))}
							
							{userFounded?.interest?.length == 0 ? <Text mt={5}>Nenhum interesse cadastrado</Text> : ''}
						</HStack>
				</ScrollView>
				</>
				}
		
			
		</SafeAreaView>
	)
}