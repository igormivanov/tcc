import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { CourseDTO } from "@dtos/CourseDTO"
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "@hooks/useAuth";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { Center, CheckIcon, FormControl, Heading, Select, Text, View, VStack, WarningOutlineIcon } from "native-base";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form"
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthNavigatorRoutesProps } from "src/routes/auth.routes";
import { HomeNavigatorRoutesProps } from "src/routes/home.routes";

import { api } from "src/service/api";
import * as yup from 'yup';

interface FormDataProps {
  courseId: string
  semester: number
  tel: string
}

const coursesFromBackend = [
  { id: '6d682c8d-4921-49fc-ada1-d40a1ff30f18', name: 'Engenharia de Produção e automação', duration: 10 },
  { id: '6d682c8d-4921-49fc-ada1-d40a1ff30f17', name: 'Ciência da Computação', duration: 20 },
  { id: '6d682c8d-4921-49fc-ada1-d40a1ff30f16', name: 'Curso C', duration: 30 },
];

const validCourseIds = coursesFromBackend.map(course => course.id);

// Esquema de validação usando yup
const SignUp2Schema = yup.object({
  courseId: yup
    .string()
    .oneOf(validCourseIds, 'Selecione um curso válido')
    .required('O campo de curso é obrigatório'),
	semester: yup
    .number()
    .typeError('O semestre deve ser um número')
    .required('O campo semestre é obrigatório')
		.max(10, 'Informe a quantidade correta de semestres'),
  tel: yup
    .string()
    .required('O campo telefone é obrigatório')
    .min(10, 'O telefone deve ter no mínimo 10 dígitos'),
});

export function SignUp2({ route }: any){

	const navigation = useNavigation<AuthNavigatorRoutesProps>()
	const [isLoading, setIsLoading] = useState(false)
	const [courses, setCourses] = useState<CourseDTO[]>([])
	const { name, email, password } = route.params
	const {signIn} = useAuth()

	function handleGoBack() {
		navigation.goBack()
	}

	useEffect(() => {
		const getCourses = async () => {
			try {
        const {data} = await api.get('/courses')
        setCourses(data.courses)
      } catch (err) {
        throw err
      }
		}

		getCourses()
	}, [])

	async function handleSignUp({courseId, semester, tel}: FormDataProps) {
		try {
			setIsLoading(true)
			await api.post('/users', {name, email, semester, password, courseId, tel})
			await signIn(email, password)
			// navigation.navigate('homeScreen')
			// navigation.dispatch(CommonActions.reset({
			// 	index: 1,
			// 	routes: [
			// 		{ name: 'homeScreen' },
			// 	],
			// }));
			// navigation.reset({
			// 	index: 0,
			// 	routes: [{ name: 'homeScreen' }], // Referenciando a rota da aba Home
			// });

		} catch (err) {
			setIsLoading(false)
		}
		navigation.navigate("signIn")
	}

  const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<FormDataProps>({
		resolver: yupResolver(SignUp2Schema)
	})

  return (
		<View
			
			// contentContainerStyle={{ flexGrow: 1 }}
			// showsVerticalScrollIndicator={false}
      
		>
			<VStack  px={10}  backgroundColor="green.300">

				<Center my={24}>
					<Text color="gray.100" fontSize="sm">
            Parte 2, falta pouco!
					</Text>
				</Center>

				<Center>
					<Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
						Preencha os seguintes campos para concluir o cadastro.
					</Heading>

					<Controller
						control={control}
						name="courseId"
						render={({ field: { onChange, value } }) => (
							// <Input
							// 	placeholder="Nome"
							// 	onChangeText={onChange}
							// 	value={value}
							// 	errorMessage={errors.courseId?.message}
							// />
							<Center>
								<FormControl w="310" py={2} maxW="500" isRequired isInvalid={!!errors.courseId}>
									<Select 
										color="gray.300"
										fontSize="md"
										selectedValue={value}
										onValueChange={onChange} 
										h={14} 
										w="100%" 
										bg="gray.100" 
										accessibilityLabel="Choose Service" 
										placeholder="Encontre seu curso" 
										_selectedItem={{
											bg: "gray.100",
											endIcon: <CheckIcon size={5} />,
											// fontSize: "xl"
											
										}}
										mt="1"
									>
										{courses.map((course) => (
											<Select.Item key={course.id} label={course.name} value={course.id} />
										))}
									</Select>
									<FormControl.ErrorMessage _text={{color: "red2"}} leftIcon={<WarningOutlineIcon size="xs" />}>
										O campo curso é obrigatório
									</FormControl.ErrorMessage>
								</FormControl>
							</Center>
						)}
					/>
						

					<Controller
						control={control}
						name="semester"
						render={({ field: { onChange, value } }) => (
							<Input
								placeholder="Semestre"
								keyboardType="number-pad"
								autoCapitalize="none"
								onChangeText={text => onChange(Number(text))}
								value={value ? String(value) : ''}
								errorMessage={errors.semester?.message}
							/>
						)}
					/>

					<Controller
						control={control}
						name="tel"
						render={({ field: { onChange, value } }) => (
							<Input
								placeholder="Telefone"
								keyboardType="phone-pad"
								onChangeText={onChange}
								value={value}
								errorMessage={errors.tel?.message}
							/>
						)}
					/>

					<Button
						title="Finalizar cadastro"
						onPress={handleSubmit(handleSignUp)}
						isLoading={isLoading}
					/>
				</Center>

				<Button
					title="Voltar para o login"
					variant="outline"
					mt={12}
					onPress={handleGoBack}			
				/>
			</VStack>
		</View>
	) 
}