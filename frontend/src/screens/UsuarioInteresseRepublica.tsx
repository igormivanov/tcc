import { Box, Button, CheckIcon, Divider, Heading, HStack, Input, Select, Text, VStack } from "native-base";
import { SafeAreaView, TouchableOpacity } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import * as yup from 'yup';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "@hooks/useAuth";
import { useRepublicInterest } from "@hooks/useRepublicInterest";

interface FormDataProps {
  resident_limit: string
}

export function UsuarioInteresseRepublica(){

  const NewRepublicInterestSchema = yup.object({
    resident_limit: yup
      .string()
      .required('O campo de curso é obrigatório'),
  });

  const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<FormDataProps>({
		resolver: yupResolver(NewRepublicInterestSchema)
	})

  const navigation = useNavigation()

  const [genero, setGenero] = useState('')
  const {findUserById} = useAuth()
  const {createRepublicInterest} = useRepublicInterest()

  async function handleNewRepublicInterest({resident_limit}: FormDataProps){
    console.log(resident_limit, genero)
    await createRepublicInterest(Number(resident_limit), genero)
    await findUserById()
    navigation.goBack()
  }

  return (
    <SafeAreaView>
      <HStack justifyContent="space-between" my={2} alignItems="center">
        <Button variant="unstyled" onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" size={18}/>
        </Button>
        <Heading fontSize="xl">Registrar interesse em república</Heading>
        <Button opacity={0} variant="unstyled">
          <FontAwesome name="question-circle" size={18}/>
        </Button>
      </HStack>
      <Divider/>

      <VStack mt={8} px={4} space={4}>
        <Text fontSize="md">Ao registrar interesse em república, você estará visível para que outros usuários com a mesma finalidade possam te encontrar.</Text>
        <VStack mt={4}>
          <Text fontSize="md">Público com quem irá dividir</Text>
          <Box w="80%">
                <Select 
                  variant="rounded" 
                  selectedValue={genero} 
                  minWidth="200" 
                  accessibilityLabel="De (Selecione uma cidade)" 
                  placeholder="Nenhuma opção selecionada"
                  placeholderTextColor="text.900"
                  fontSize="sm" 
                  _selectedItem={{
                    bg: "gray.200",
                    endIcon: <CheckIcon size="5" />
                  }} 
                  mt={1} 
                  onValueChange={itemValue => setGenero(itemValue)}
                >
                  <Select.Item label="Homens" value="MAN" />
                  <Select.Item label="Mulheres" value="WOMAN" />
                  <Select.Item label="Tanto faz" value="ANYONE" />
                </Select>
              </Box>
        </VStack>

        <Controller
						control={control}
						name="resident_limit"
						render={({ field: { onChange, value } }) => (
							<VStack space={2}> 
                <Text fontSize="md">Quantidade máxima de moradores</Text>
                <Input
                  w="80%"
                  keyboardType="number-pad"
                  onChangeText={onChange}
                  value={value}
                  variant="outline" p={2}
                />
              </VStack>
						)}
					/>
        

        <Button backgroundColor="green.300" mt={10} onPress={handleSubmit(handleNewRepublicInterest)}>registrar</Button>
      </VStack>

    </SafeAreaView>
  )
}