import { useNavigation } from "@react-navigation/native";
import { Box, Button, Center, CheckIcon, Divider, Heading, HStack, Select, Text, VStack } from "native-base";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { HomeNavigatorRoutesProps } from "src/routes/home.routes";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { TouchableOpacity } from "react-native";
import { useCity } from "@hooks/useCity";
import { useRide } from "@hooks/useRide";

export function RideFilter(){

  const navigation = useNavigation<HomeNavigatorRoutesProps>()

  const {citySearch} = useCity()
  const {getRides} = useRide()

  async function handleSearchRideFiltered(){
    if (citySearch.origin && citySearch.destination) {
      await getRides(citySearch.origin, citySearch.destination)
      navigation.navigate("ride")
    }
    console.log("nada feito")
  }

  return (
    <SafeAreaView>

      <HStack alignItems="center" justifyContent="space-between" my={2}>
        <Button variant="unstyled" onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" size={18}/>
        </Button>
        <Heading  textAlign="center" size="md" bold>Filtrar caronas</Heading>
        <Button opacity={0} variant="unstyled" >
          <FontAwesome name="chevron-left" size={14}/>
        </Button>
      </HStack>

      <Divider/>

      <VStack mx={5} mt={5}>
        <VStack mt={8} py={5} space={8} backgroundColor="gray.100" borderRadius={10}>
          
            
          <Center>
            <Box w="80%" p={2} borderBottomColor="gray.200" borderBottomWidth={1}>
              <TouchableOpacity onPress={() => navigation.navigate("citySearch", {type: 'origin'})}>
                <Text fontSize="md">{citySearch.origin ? `De ${citySearch.origin}` : "De (Selecione uma cidade)"}</Text>
              </TouchableOpacity>
            </Box>
          </Center>

          <Center>
            <Box w="80%" p={2} borderBottomColor="gray.200" borderBottomWidth={1}>
              <TouchableOpacity onPress={() => navigation.navigate("citySearch", {type: 'destination'})}>
                <Text fontSize="md">{citySearch.destination ? `Para ${citySearch.destination}` : "Para (Selecione uma cidade)"}</Text>
              </TouchableOpacity>
            </Box>
          </Center>
          
          <Center mt={5}>
            <Box w="80%" backgroundColor="gray.200">
              <Button
                onPress={handleSearchRideFiltered} 
                _spinner={{color: "gray.700"}} 
                // isLoading 
                // isLoadingText="Buscando"
                backgroundColor="gray.200" 
                color="gray.700" 
                variant="unstyled" 
                _pressed={{bg: "gray.300"}}
              >
                Realizar busca
              </Button>
            </Box>
          </Center>

        </VStack>
      </VStack>
    </SafeAreaView>
  )
}