import { HStack, Divider, Button, Text, Heading, VStack, Box, Select, CheckIcon, Input, FormControl, WarningOutlineIcon, Center } from 'native-base';
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from 'react';
import { useAuth } from '@hooks/useAuth';
import * as yup from 'yup';
import { api } from 'src/service/api';
import { InterestDTO } from '@dtos/InterestDTO';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { CourseDTO } from '@dtos/CourseDTO';
import { ProfileNavigatorRoutesProps } from 'src/routes/profile.routes';

interface FormDataProps {
  name?: string
  courseId?: string
  semester?: number
  tel?: string
}

export function ProfilePreferences(){

  const navigation = useNavigation<ProfileNavigatorRoutesProps>()
  const [service, setService] = useState("");
  const {user, findUserById, token} = useAuth()
  const [courses, setCourses] = useState<CourseDTO[]>([])

  useEffect(() => {
    const fetchInterests = async () => {
     try {
      const {data} = await api.get('/interests')
      const info = await api.get('/courses')
      setCourses(info.data.courses)
     } catch (err) {
      throw err
     } 
    }
    fetchInterests()
    
  },[])
  // const valid

  const updateProfileSchema = yup.object({
    name: yup
      .string()
      .optional(),
    courseId: yup
    .string()
    .optional(),
    semester: yup
      .number()
      .typeError('O semestre deve ser um número')
      .max(10, 'Informe a quantidade correta de semestres')
      .optional(),
    tel: yup
      .string()
      .min(10, 'O telefone deve ter no mínimo 10 dígitos')
      .optional(),
  });

  const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<FormDataProps>({
		resolver: yupResolver(updateProfileSchema),
    defaultValues: {
      name: user.name,
      courseId: user.course.id,
      semester: user.semester,
      tel: user.tel,
    }
	})

  async function handleUserUpdate({name, courseId, semester, tel}: FormDataProps) {
    try {
      await api.post('/users/update', {
        name,
        courseId,
        semester,
        tel
      },{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      findUserById()
      navigation.navigate("profileScreen")
    } catch (err) {
      throw err
    }
  }

  return (
    <SafeAreaView>
      <HStack justifyContent="space-between" my={2} alignItems="center">
        <Button variant="unstyled" onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" size={18}/>
        </Button>
        <Heading fontSize="xl">Preferências</Heading>
        <Button opacity={0} variant="unstyled">
          <FontAwesome name="question-circle" size={18}/>
        </Button>
      </HStack>
      <Divider/>
      <VStack mt={8} px={4} space={4}>
        <VStack>
          <Text>Nome completo</Text>
          <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder={user.name}
                  autoCapitalize="none"
                  onChangeText={text => onChange(text)}
                  value={value}
                  // errorMessage={errors.semester?.message}
                />
              )}
					  />
        </VStack>

        <HStack justifyContent="space-between" alignItems="flex-end">
          <VStack w="65%">
            <Text>Curso</Text>
            <Controller
              control={control}
              name="courseId"
              render={({ field: { onChange, value } }) => (
                <Center>
                  <FormControl isRequired isInvalid={!!errors.courseId}>
                    <Select 
                      color="gray.300"
                      // fontSize="md"
                      selectedValue={value}
                      onValueChange={onChange} 
                      // h={14} 
                      // w="100%" 
                      // bg="gray.100" 
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
          </VStack>
          <VStack w="25%">
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
                  // errorMessage={errors.semester?.message}
                />
              )}
					  />
          </VStack>
        </HStack>

        <VStack>
          <Text>Número de telefone</Text>
          <Controller
						control={control}
						name="tel"
						render={({ field: { onChange, value } }) => (
							<Input
								placeholder="Telefone"
								keyboardType="phone-pad"
								onChangeText={onChange}
								value={value}
								// errorMessage={errors.tel?.message}
							/>
						)}
					/>
        </VStack>

        <VStack>
          {/* <Text>Interesses</Text> */}
          {/* <Box maxW="300">
        <Select selectedValue={service} minWidth="200" accessibilityLabel="Choose Service" placeholder={loading ? "Loading..." : "Adicione um novo interesse"} _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />
          }} mt={1} onValueChange={itemValue => setService(itemValue)}>
              {loading ? 
              <Select.Item label="Loading..." value="Loading" /> :
              interests.map(interest => {
                <Select.Item key={interest.id} label={interest.name} value={interest.name} />
              })}
            </Select>
          </Box> */}
          {/* <FormControl w="310" py={2} maxW="500" isRequired isInvalid={!!errors.courseId}>
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
										{coursesFromBackend.map((course) => (
											<Select.Item key={course.id} label={course.name} value={course.id} />
										))}
									</Select>
									<FormControl.ErrorMessage _text={{color: "red2"}} leftIcon={<WarningOutlineIcon size="xs" />}>
										O campo curso é obrigatório
									</FormControl.ErrorMessage>
								</FormControl> */}
        </VStack>
        
        <Button backgroundColor="green.300" onPress={handleSubmit(handleUserUpdate)} mt={10}>Confirmar edição</Button>
      </VStack>
    </SafeAreaView>
  )
}