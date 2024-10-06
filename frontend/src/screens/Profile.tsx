// import { yupResolver } from '@hookform/resolvers/yup'
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import {
	Badge,
	Box,
	Center,
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
	Spinner
} from 'native-base'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { TouchableOpacity } from 'react-native'
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

const PHOTO_SIZE = 98

type FormDataProps = {
	name: string
	email: string
	password: string
	old_password: string
	confirm_password: string
}

export function Profile() {
	const [isUpdating, setIsUpdating] = useState(false)
	const [photoIsLoading, setPhotoIsLoading] = useState(false)
	const [userPhoto, setUserPhoto] = useState('https://github.com/mgckaled.png')

	const toast = useToast()
	const navigation = useNavigation<ProfileNavigatorRoutesProps>()
	const { user, findUserById, token } = useAuth()
	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<FormDataProps>()

	// async function handleUserPhotoSelected() {
	// 	setPhotoIsLoading(true)

	// 	try {
	// 		const photoSelected = await ImagePicker.launchImageLibraryAsync({
	// 			mediaTypes: ImagePicker.MediaTypeOptions.Images,
	// 			quality: 1,
	// 			aspect: [4, 4],
	// 			allowsEditing: true
	// 		})

	// 		if (photoSelected.canceled) {
	// 			return
	// 		}

	// 		if (photoSelected.assets[0].uri) {
	// 			const photoInfo = await FileSystem.getInfoAsync(
	// 				photoSelected.assets[0].uri
	// 			)

	// 			if (photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {
	// 				return toast.show({
	// 					title: 'Essa imagem é muito grande. Escolha uma de até 5MB.',
	// 					placement: 'top',
	// 					bgColor: 'red'
	// 				})
	// 			}

	// 			const fileExtension = photoSelected.assets[0].uri.split('.').pop()

	// 			const photoFile = {
	// 				name: `${user.name}.${fileExtension}`.toLowerCase(),
	// 				uri: photoSelected.assets[0].uri,
	// 				type: `${photoSelected.assets[0].type}/${fileExtension}`
	// 			} as any

	// 			const userPhotoUploadForm = new FormData()

	// 			userPhotoUploadForm.append('avatar', photoFile)

	// 			const avatarUpdtedResponse = await api.patch(
	// 				'/users/avatar',
	// 				userPhotoUploadForm,
	// 				{
	// 					headers: {
	// 						'Content-Type': 'multipart/form-data'
	// 					}
	// 				}
	// 			)

	// 			const userUpdated = user

	// 			userUpdated.avatar = avatarUpdtedResponse.data.avatar

	// 			await updateUserProfile(userUpdated)

	// 			toast.show({
	// 				title: 'Foto atualizada!',
	// 				placement: 'top',
	// 				bgColor: 'green.500'
	// 			})
	// 		}
	// 	} catch (error) {
	// 		console.log(error)
	// 	} finally {
	// 		setPhotoIsLoading(false)
	// 	}
	// }

	// async function handleProfileUpdate(data: FormDataProps) {
	// 	try {
	// 		setIsUpdating(true)

	// 		// const userUpdated = user
	// 		// userUpdated.name = data.name

	// 		// await api.put('/users', data)

	// 		// await updateUserProfile(userUpdated)

	// 		toast.show({
	// 			title: 'Perfil atualizado com sucesso!',
	// 			placement: 'top',
	// 			bgColor: 'green.500'
	// 		})
	// 	} catch (error) {
	// 		const isAppError = error instanceof AppError
	// 		const title = isAppError
	// 			? error.message
	// 			: 'Não foi possível atualizar os dados. Tente novamente mais tarde.'

	// 		toast.show({
	// 			title,
	// 			placement: 'top',
	// 			bgColor: 'red.500'
	// 		})
	// 	} finally {
	// 		setIsUpdating(false)
	// 	}
	// }

	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const userProfileHandler = async () => {
			try {
				if (!user.id) {
					await findUserById()
				}
			} catch (err) {
				throw err
			} 
		}
		userProfileHandler()
	}, [user, token])

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

	console.log(user.id)
	const userNameFormatted = userNameFormatter(user.name)

	return (
		<VStack flex={1}>
			<ScreenHeader title="Meu Perfil" />
			
			
				{!user.id ? <Center flex={1}><Spinner color="green.500"/></Center> : 
					<>
					<ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
						<HStack mt={4} ml={5}>
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


								<VStack ml={5} pt={2}>
									<Text fontSize="sm">{userNameFormatted}</Text>
									<Text fontSize="xs">{user.course.name} - {user.semester}° semestre</Text>
									{/* <Button mt={3} title="Editar perfil" width={26} height={10} px={2} bg="green.300">teste</Button> */}
									<Button mt={3} w="80%" size="sm" bg="green.300" onPress={() => navigation.navigate("settings")}>Configurações</Button>
								</VStack>
						</HStack>

						<VStack space={5} px={3} mt="16" mb={10}>
							<HStack>
								<Text w="25%" pr={10}>E-mail</Text>
								<Text flex={1}>{user.email}</Text>
							</HStack>
							<HStack>
								<Text w="25%" pr={10}>Tel</Text>
								<Text flex={1}>{user.tel}</Text>
							</HStack>
							<HStack>
								<Text w="25%" pr={10}>Aluguel</Text>
								<Text flex={1}>
									{!user.republicInterest ? 'Não cadastrado' :
										republicPreferencesRender(user.republicInterest.preferences.toString())  + ' / ' + user.republicInterest.resident_limit
									}
								</Text>
							</HStack>
							<HStack>
								<Text w="25%" pr={10}>Carona</Text>
								<Text flex={1} >
									{user.ride ? 
											user.ride.origin + ' > ' + user.ride.destination :
											'Não cadastrado'
									}
								</Text>
							</HStack>
						</VStack>

						<Divider/>		

						<Center mt={5}>
							<Text fontSize={"md"}>Interesses</Text>
						</Center>

			
						<HStack justifyContent="center" flexWrap="wrap">
							
							{user.interests?.map(interest => (
									<Badge key={interest.id} minW="30%" variant="solid" p={1} mt={2} mb={2} mr={2} >{interest.name}</Badge>
							))}
							
							{user.interests?.length == 0 ? <Text mt={5}>Nenhum interesse cadastrado</Text> : ''}
						</HStack>
				</ScrollView>
				</>
				}
		
			
		</VStack>
	)
}