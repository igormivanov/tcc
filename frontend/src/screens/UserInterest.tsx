import { Badge, Box, Button, Center, CheckIcon, Divider, FormControl, Heading, HStack, Input, ScrollView, Select, Text, VStack, WarningOutlineIcon } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { InterestDTO } from "@dtos/InterestDTO";
import { api } from "src/service/api";
import { useAuth } from "@hooks/useAuth";
import { ProfileNavigatorRoutesProps } from "src/routes/profile.routes";

interface FormDataProps {
  interestId: string
}

export function UserInterest(){

  const navigation = useNavigation<ProfileNavigatorRoutesProps>()
  const [userInterests, setUserInterests] = useState<InterestDTO[]>([])
  const [dataInterests, setDataInterests] = useState<InterestDTO[]>([])
  const [loading, setLoading] = useState(false)
  const [hasError, setHasError] = useState(false)

  const {user, token, findUserById} = useAuth()
  
  async function handleSubmit() {
    if(userInterests.length == user.interests?.length){
      const areInterestsEqual = userInterests.every(interest =>
        user.interests?.some(userInterest => userInterest.id === interest.id)
      );
      if(areInterestsEqual) {
        setHasError(true)
        return
      }
    }

    try {
      const interestIds: string[] = []

      userInterests.map(interest => {
        interestIds.push(interest.id)
      })
      
      await api.post('/users/update-interests', {
        interestIds
      },{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      findUserById()
      navigation.navigate("profileScreen")
    } catch (err) {
      console.log(err.message)
      throw err
    }
  }

  useEffect(() => {
    const getDataInterests = async () => {
      setLoading(true)
      try {
        const {data} = await api.get("/interests")
        setDataInterests(data.interests)
        if (user.interests) {
          user.interests.map(interest => {
            const teste = userInterests.filter(userInterest => userInterest.id == interest.id)
            if (teste.length == 0)
              setUserInterests(prevState => [...prevState, interest])
          })
        }
      } catch (err) {
        throw err
      } finally {
        setLoading(false)
      }
    }
    getDataInterests()
  },[])

  function handleNewInterest(interestId: string) {
    const selectedCourse = dataInterests.find(course => course.id == interestId)
    
    if(!selectedCourse) {
      throw new Error()
    }

    const teste = userInterests.filter(interest => interest.id == selectedCourse.id)
    if (teste.length == 0) {
      setUserInterests([...userInterests, selectedCourse])
    }
    console.log(userInterests)
  }
  
  function handleRemoveInterest(interestId: string) {
    const updatedInterests = userInterests.filter(interest => interest.id !== interestId);
    setUserInterests(updatedInterests)

  }

  const handleNewInterestSchema = yup.object({
    interest: yup
      .string()
      .required('O campo de curso é obrigatório'),
  });

  const {
		control,
		formState: { errors }
	} = useForm<FormDataProps>({
		resolver: yupResolver(handleNewInterestSchema)
	})

  return (
    <SafeAreaView >
      <HStack justifyContent="space-between" my={2} alignItems="center">
        <Button variant="unstyled" onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" size={18}/>
        </Button>
        <Heading fontSize="xl">Meus interesses</Heading>
        <Button opacity={0} variant="unstyled">
          <FontAwesome name="question-circle" size={18}/>
        </Button>
      </HStack>
      <Divider/>

      <VStack mt={2} px={4} space={4}>
        <VStack>
          {/* <Center><Text fontSize="md">Procure por um novo interesse</Text></Center> */}
          <Controller
						control={control}
						name="interestId"
						render={({ field: { onChange, value } }) => (
							<Center>
								<FormControl w="310" py={2} maxW="500" isRequired>
									<Select 
										color="gray.300"
										fontSize="md"
										selectedValue={value}
										onValueChange={e => handleNewInterest(e)} 
										h={8} 
										w="100%" 
										accessibilityLabel="Choose Service" 
										placeholder="Procure por um novo interesse" 
										_selectedItem={{
											bg: "gray.100",
											endIcon: <CheckIcon size={5} />,
											// fontSize: "xl"
											
										}}
										mt="1"
									>
										{dataInterests.map((interest) => (
											<Select.Item key={interest.id} label={interest.name} value={interest.id} />
										))}
									</Select>
									<FormControl.ErrorMessage _text={{color: "red2"}} leftIcon={<WarningOutlineIcon size="xs" />}>
										O campo curso é obrigatório
									</FormControl.ErrorMessage>
								</FormControl>
							</Center>
						)}
					/>
        {/* </VStack> */}
        <ScrollView h="70%" mt={5}>
         
          <Box alignItems="center" justifyContent="center">
            <HStack space={8} flexWrap="wrap" justifyContent="flex-start">
              {loading ? <Text>Carregando...</Text> : userInterests.map(interest => {
                return <VStack key={interest.id} mt={4}>
                  <Button 
                    colorScheme="danger" 
                    rounded="3xl" 
                    size={4}
                    onPress={() => handleRemoveInterest(interest.id)} 
                    mb={-3} 
                    mr={-2} 
                    zIndex={1} 
                    alignSelf="flex-end" 
                    _text={{
                      fontSize: 10,
                    }}>
                      x
                  </Button>
                  <Badge variant="solid" borderRadius="10" mx={{
                    base: "auto",
                    md: 0
                  }} p="2" _text={{
                  fontSize: 12
                  }}>
                    {interest.name}
                  </Badge>
              </VStack>
              })}

            </HStack>
          </Box>
        </ScrollView>
        
        <Button backgroundColor="green.300" mt="5" onPress={handleSubmit}>Confirmar edição</Button>
        {hasError && <Center><Text color="red">Adicione ou remova um interesse antes de salvar</Text></Center>}
      </VStack>

    </VStack>
    </SafeAreaView>
  )
}