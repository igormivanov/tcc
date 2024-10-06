import { useNavigation } from "@react-navigation/native";
import { Box, Button, Center, CheckIcon, Divider, Heading, HStack, Input, Select, Text, VStack } from "native-base";
import { useState } from "react";
import { SafeAreaView } from "react-native";
import { HomeNavigatorRoutesProps } from "src/routes/home.routes";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRepublicInterest } from "@hooks/useRepublicInterest";

export function FiltroInteresseRepublica(){

  const [genero, setGenero] = useState('')
  const [numeroMoradores, setNumeroMoradores] = useState(2)
  const {getRepublicInterests} = useRepublicInterest()

  const navigation = useNavigation<HomeNavigatorRoutesProps>()

  // const interessesFiltroSchema

  function LidarReducaoDeMoradores(){
    if (numeroMoradores > 2) {
      setNumeroMoradores(p => p - 1)
    }
  }

  async function BuscarInteressesFiltrados(){
    if (genero && numeroMoradores) {
      console.log(genero, numeroMoradores)
      await getRepublicInterests(numeroMoradores, genero)
      navigation.navigate("interesseRepublica")
    }
    
  }

  return (
    <SafeAreaView>

      <HStack alignItems="center" justifyContent="space-between" my={2}>
        <Button variant="unstyled" onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" size={18}/>
        </Button>
        <Heading textAlign="center" size="md" bold>Filtrar interesse de república</Heading>
        <Button opacity={0} variant="unstyled">
          <FontAwesome name="chevron-left" size={14}/>
        </Button>
      </HStack>

      <Divider/>

      <VStack h="90%" justifyContent="center">
        
        <Center mx={5} py={10} borderRadius={10} backgroundColor="gray.100">
            <VStack w="100%" alignItems="center" mb={10}>
              <Text fontSize="lg">Com quem deseja dividir a moradia?</Text>
              <Box w="80%" p={2}>
                <Select 
                  variant="underlined" 
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
          
           <VStack>
            <Text fontSize="lg">Número máximo de moradores</Text>
            <HStack justifyContent="space-around">
              <Button 
                onPress={LidarReducaoDeMoradores}
                _text={{fontSize: "3xl"}}
                variant="unstyled"
              >-</Button>
              <Text fontSize="xl" alignSelf="center">{numeroMoradores}</Text>
              <Button
                _text={{fontSize: "3xl"}}
                onPress={() => setNumeroMoradores(p => p + 1)}
                variant="unstyled"
              >+</Button>
            </HStack>
           </VStack>

            <Button onPress={() => BuscarInteressesFiltrados()} mt={10} px={20} backgroundColor="gray.200" color="green.700" variant="unstyled" >
                Realizar busca
              </Button>
          </Center>

      </VStack>
    </SafeAreaView>
  )
}