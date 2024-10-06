import { Button, Center, Divider, Heading, HStack, ScrollView, Text, VStack } from "native-base";
import { SafeAreaView } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import { useRepublicInterest } from "@hooks/useRepublicInterest";
import { TYPES } from "@dtos/TypesDTO";

export function InteresseRepublica() {

  const navigation = useNavigation()
  const {republicInterest} = useRepublicInterest()


  return (
    <SafeAreaView>

      <HStack alignItems="center" my={2}>
        <Button  variant="unstyled" onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" size={18}/>
        </Button>
        <Heading  textAlign="center" size="md" bold>Pessoas interessadas em república</Heading>
        <Button opacity={0} variant="unstyled">
          <FontAwesome name="chevron-left" size={14}/>
        </Button>
      </HStack>

      <Divider/>


      {/* <Text px={5} pt={5} textAlign="center">
        {republicInterest.length > 0 ? `Foram encontradas ${republicInterest.length} pessoas para essa busca` : 
          `Foi encontrada apenas ${republicInterest.length} para essa busca`
        }
        
      </Text> */}

      <ScrollView>
        <VStack px={5} mt={4} space={4}>
          
          {republicInterest.length > 0 ? 
            republicInterest.map(rep => {
              return <VStack bg={{
                linearGradient: {
                  colors: ['gray.100', 'green.300'],
                  start: [0,1],
                  end: [3,0]
                }
              }}  borderRadius={8} p={2}>
                <Text fontSize="lg">{rep.user.name}</Text>
                <Text>
                  { rep.preferences.toString() == "ANYONE" ?
                    `Ambos gêneros / Máximo ${rep.resident_limit} residentes` :
                    rep.preferences.toString() == "MAN" ? 
                    `Dividir com Homens / Máximo ${rep.resident_limit} residentes` :
                    rep.preferences.toString() == "WOMAN" ? 
                    `Dividir com Mulheres / Máximo ${rep.resident_limit} residentes` :
                    ''
                  }
                </Text>
              </VStack>
            }) : 
            <Center mt={8} >
              <VStack justifyContent="center" alignItems="center">
                <Text fontSize="md">Ops!</Text>
                <Text>Não há nenhuma pessoa com base no seu filtro.</Text>
              </VStack>
            </Center>
          }

           

          {/* <VStack bg={{
            linearGradient: {
              colors: ['gray.100', 'green.300'],
              start: [0,1],
              end: [3,0]
            }
          }}  borderRadius={8} p={2}>
            <Text fontSize="lg">Marcos Paulo</Text>
            <Text>Homens ou Mulheres / Máximo 2 residentes</Text>
          </VStack>  */}

        </VStack>
      </ScrollView>
    </SafeAreaView>
  )
}