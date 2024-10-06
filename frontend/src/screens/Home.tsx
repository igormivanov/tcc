import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { Box, Center, FlatList, HStack, Image, Text, VStack } from "native-base";
import { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { format, formatDate } from 'date-fns/format';
import {ptBR} from 'date-fns/locale';
import Carona from '@assets/carona.svg'
import HouseImg from '@assets/home.svg'
import FindUsersImg from '@assets/findusers.svg'
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { HomeNavigatorRoutesProps, HomeRoutesTypes } from "src/routes/home.routes";
import { useAuth } from "@hooks/useAuth";
// import { Image } from "react-native-svg";

export function Home(){

	const currentDate = new Date();
	const monthName = format(currentDate, 'MMMM', { locale: ptBR });
	const dayOfWeek = format(currentDate, 'EEEE', { locale: ptBR });

	const { user } = useAuth()

	const navigation = useNavigation<HomeNavigatorRoutesProps>()
	

	const capitalizeFirstLetter = (string: string) => {
		return string.charAt(0).toUpperCase() + string.slice(1)
	}

  return (
    <VStack flex={1} mx={5}>
			<SafeAreaView>
				<VStack mt={10} alignItems="flex-end">
					<Text fontSize="xl" fontFamily="heading">{capitalizeFirstLetter(dayOfWeek)}, {currentDate.getDate()} de {monthName}</Text>
					<Text fontSize="md" color="gray.300">Bem vindo {user.name}</Text>
				</VStack>

				<VStack mt="16">
					<Text fontSize="xl" fontFamily="heading">Escolha uma atividade</Text>
					<Text fontFamily="heading">que deseja encontrar</Text>

					<HStack my={5}>
						<Text>Explorar</Text>
					</HStack>
				</VStack>

				<VStack space={5}>
					<TouchableOpacity onPress={() => navigation.navigate("rideFilter")}>
						<HStack w="100%" backgroundColor="gray.100" borderRadius={8} p={4}>
							<VStack w="70%">
								<Text fontSize="xl">Buscar caronas</Text>
								<Text fontSize="xs">Encontre alunos que utilizam a mesma rota que você!</Text>
							</VStack>
							<Carona width="30%" height="100%"/>
						</HStack>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => navigation.navigate("filtroInteresseRepublica")}>
						<HStack w="100%" backgroundColor="gray.100" borderRadius={8} p={4}>
							<VStack w="70%">
								<Text fontSize="xl">Buscar república</Text>
								<Text fontSize="xs">Encontre alunos que também estão procurando por uma moradia!</Text>
							</VStack>
							<HouseImg width="30%" height="100%"/>
						</HStack>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => navigation.navigate("search")}>
						<HStack w="100%" backgroundColor="gray.100" borderRadius={8} p={4}>
							<VStack w="70%">
								<Text fontSize="xl">Procurar usuário</Text>
								<Text fontSize="xs">Pesquise pelos alunos que mais possuem interesses em comum com você!</Text>
							</VStack>
							<FindUsersImg width="30%" height="100%"/>
						</HStack>
					</TouchableOpacity>
				</VStack>
				
			</SafeAreaView>
    </VStack>
  )
}