import { Box, Button, CheckIcon, Divider, Heading, HStack, Input, Select, Text, VStack } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import React, { useState  } from "react";
import { ProfileNavigatorRoutesProps } from "src/routes/profile.routes";
import { useRide } from "@hooks/useRide";
import { useCity } from "@hooks/useCity";
import { useAuth } from "@hooks/useAuth";

export function RideCreation(){

  const [limit, setLimit] = useState('')
  const navigation = useNavigation<ProfileNavigatorRoutesProps>()
  const {citySearch} = useCity()
  const {createRide} = useRide()
  const {findUserById} = useAuth()

  const handleRegister = async () => {
    await createRide(citySearch.origin, citySearch.destination, Number(limit))
    await findUserById()
    navigation.goBack()
  }

  return (
    <SafeAreaView>
      <HStack justifyContent="space-between" my={2} alignItems="center">
        <Button variant="unstyled" onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" size={18}/>
        </Button>
        <Heading fontSize="xl">Registrar carona</Heading>
        <Button opacity={0} variant="unstyled">
          <FontAwesome name="question-circle" size={18}/>
        </Button>
      </HStack>
      <Divider/>

      <VStack mt={8} mx={5} space={10}>
        {/* <Input variant="filled"
          placeholder=""
          readOnly>
        </Input> */}
        <TouchableOpacity onPress={() => navigation.navigate("citySearch", {type: 'origin'})}>
          <Box borderBottomStyle="solid"  p={2} borderColor="gray.300" borderBottomWidth={1}>
            <Text color="gray.300" >{citySearch.origin ? `De ${citySearch.origin}` : `De ( digite uma cidade )`}</Text>
          </Box>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("citySearch", {type: 'destination'})}>
          <Box borderBottomStyle="solid"  p={2} borderColor="gray.300" borderBottomWidth={1} >
            <Text color="gray.300" >{citySearch.destination ? `Para ${citySearch.destination}` : `Para ( digite uma cidade )`}</Text>
          </Box>
        </TouchableOpacity>

        <VStack>
          <Text>Número máximo de passageiros</Text>
          <Box maxW="300">
            <Select selectedValue={limit} minWidth="200" accessibilityLabel="Choose Service" placeholder="Escolha uma opção" _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />
              }} mt={1} onValueChange={itemValue => setLimit(itemValue)}>
                <Select.Item label="1 passageiro" value="1" />
                <Select.Item label="2 passageiros" value="2" />
                <Select.Item label="3 passageiros" value="3" />
                <Select.Item label="4 passageiros" value="4" />
            </Select>
          </Box>
        </VStack>
        
        <Button backgroundColor="green.300" onPress={() => handleRegister()}>registrar</Button>

      </VStack>

    </SafeAreaView>
  )
}