import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { useAuth } from "@hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { AppError } from "../utils/AppError";
import { isLoading } from "expo-font";
import { Center, HStack, Heading, ScrollView, Text, VStack, useToast } from "native-base";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AuthNavigatorRoutesProps } from "src/routes/auth.routes";

type FormData = {
	email: string
	password: string
}

export function SignIn() {
	const [isLoading, setIsLoading] = useState(false)

	const { signIn } = useAuth()
	const navigation = useNavigation<AuthNavigatorRoutesProps>()
	const toas = useToast()

	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<FormData>()

	function handleNewAccount() {
		navigation.navigate('signUp')
	}

	async function handleSignIn({email, password}: FormData){
		try {
			setIsLoading(true)
			await signIn(email, password)
		} catch (err) {
			const isAppError = err instanceof AppError
			const title = isAppError ? err.message : "Não foi possível entrar. Tente novamente mais tarde."
			toas.show({
				title,
				placement: 'top',
				bgColor: 'red'
			})

			setIsLoading(false)
		}
		
		console.log(email, password)
		// signIn(email, password)
	}


	// async function handleSignIn({ email, password }: FormData) {
	// 	try {
	// 		setIsLoading(true)
	// 		await singIn(email, password)
	// 	} catch (error) {
	// 		const isAppError = error instanceof isAppError

	// 		const title = isAppError
	// 			? error.message
	// 			: 'Não foi possível entrar. Tente novamente mais tarde.'

	// 		toas.show({
	// 			title,
	// 			placement: 'top',
	// 			bgColor: 'red.500'
	// 		})
	// 		setIsLoading(false)
	// 	}
	// }

	return (
		<ScrollView
			contentContainerStyle={{ flexGrow: 1 }}
			showsVerticalScrollIndicator={false}
			backgroundColor="green.300"
		>
			<VStack flex={1} px={10} pb={16}>
				<Center my={24}>

					<Text color="gray.100" fontSize="sm">
						Conheça, interaja e faça novas amizades!
					</Text>
				</Center>

				<Center>
					<Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
						Acesse a conta
					</Heading>

          {/* <Input
								placeholder="E-mail"
								keyboardType="email-address"
								autoCapitalize="none"
								// onChangeText={onChange}
								// errorMessage={errors.email?.message}
							/> */}

					<Controller
						control={control}
						name="email"
						rules={{ required: 'Informe o e-mail' }}
						render={({ field: { onChange } }) => (
							<Input
								placeholder="E-mail"
								keyboardType="email-address"
								autoCapitalize="none"
								onChangeText={onChange}
								errorMessage={errors.email?.message}
							/>
						)}
					/>

              {/* <Input
								placeholder="Senha"
								secureTextEntry
								// onChangeText={onChange}
								// errorMessage={errors.password?.message}
							/> */}

					<Controller
						control={control}
						name="password"
						rules={{ required: 'Informe a senha' }}
						render={({ field: { onChange } }) => (
							<Input
								placeholder="Senha"
								secureTextEntry
								onChangeText={onChange}
								errorMessage={errors.password?.message}
							/>
						)}
					/>

					<Button
						title="Acessar"
						onPress={handleSubmit(handleSignIn)}
						isLoading={isLoading}
					/>
				</Center>

				<Center mt={24}>
					<Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
						Ainda não tem acesso?
					</Text>

					<Button
						title="Criar Conta"
						variant="outline"
						onPress={handleNewAccount}
					/>
				</Center>
			</VStack>
		</ScrollView>
	)
}