import { HStack, Heading, Divider, Button, VStack, Text, Input, useToast } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "@hooks/useAuth";

type FormDataProps = {
	currentPassword: string
  newPassword: string
  newPasswordConfirm: string
}

export function PasswordChange(){

  const updatePasswordSchema = yup.object({
    currentPassword: yup
      .string()
      .required('Informe a senha atual')
      .min(6, 'A senha deve ter pelo menos 6 dígitos.'),
    newPassword: yup
      .string()
      .required('Informe a nova senha')
      .min(6, 'A senha deve ter pelo menos 6 dígitos.'),
    newPasswordConfirm: yup
      .string()
      .required('Confirme a senha.')
      .oneOf([yup.ref('newPassword'), null], 'As senhas precisam ser iguais')
  })

  const {
		control,
		handleSubmit,
    reset,
		formState: { errors }
	} = useForm<FormDataProps>({
		resolver: yupResolver(updatePasswordSchema)
	})

  const navigation = useNavigation()
  const {passwordChange} = useAuth()
  const toas = useToast()

  async function handlePasswordChange({currentPassword, newPassword, newPasswordConfirm}: FormDataProps) {
    passwordChange(currentPassword, newPassword)
    toas.show({
      title: "Senha alterada com sucesso",
      placement: 'top',
      bgColor: 'green.500'
    })
    reset()
  }

  return (
    <SafeAreaView>
      <HStack justifyContent="space-between" my={2} alignItems="center">
        <Button variant="unstyled" onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" size={18}/>
        </Button>
        <Heading fontSize="xl">Alterar senha</Heading>
        <Button opacity={0} variant="unstyled">
          <FontAwesome name="question-circle" size={18}/>
        </Button>
      </HStack>
      <Divider/>

      <VStack mt={8} px={4} space={4}>
        <Text fontSize="md">A senha deve ter no mínimo 6 caracteres e incluir uma combinação de números, letras e caracteres especiais(!$@%).</Text>
        <VStack mt={2}>
          <Text fontSize="md">Senha atual</Text>
          <Controller
						control={control}
						name="currentPassword"
						render={({ field: { onChange, value } }) => (
							<Input
								// placeholder="Senha"
								secureTextEntry
								onChangeText={text => onChange(text)}
								value={value}
                p={4}
							/>
						)}
					/>
          {errors.currentPassword && <Text color="red">{errors.currentPassword.message}</Text>}
        </VStack>
        <VStack>
          <Text fontSize="md">Senha nova</Text>
          <Controller
						control={control}
						name="newPassword"
						render={({ field: { onChange, value } }) => (
							<Input
								// placeholder="Senha"
								secureTextEntry
								onChangeText={text => onChange(text)}
								value={value}
                p={4}
							/>
						)}
					/>
          {errors.newPassword && <Text color="red">{errors.newPassword.message}</Text>}
        </VStack>
        <VStack>
          <Text fontSize="md">Confirmar senha nova</Text>
          <Controller
						control={control}
						name="newPasswordConfirm"
						render={({ field: { onChange, value } }) => (
							<Input
								// placeholder="Senha"
								secureTextEntry
								onChangeText={text => onChange(text)}
								value={value}
                p={4}
								// errorMessage={errors.password?.message}
							/>
						)}
					/>
          {errors.newPasswordConfirm && <Text color="red">{errors.newPasswordConfirm.message}</Text>}
        </VStack>
        <TouchableOpacity>
          <Text color="gray.300">Esqueceu a senha?</Text>
        </TouchableOpacity>

        <Button backgroundColor="green.300" mt={10} onPress={handleSubmit(handlePasswordChange)}>Alterar senha</Button>
      </VStack>

      
    </SafeAreaView>
  )
}