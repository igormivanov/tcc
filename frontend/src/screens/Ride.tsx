import { Box, Button, Center, Divider, Heading, HStack, ScrollView, Text, VStack } from "native-base";
import React from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useNavigation } from "@react-navigation/native";
import { useCity } from "@hooks/useCity";
import { useRide } from "@hooks/useRide";

export function Ride(){

  const navigation = useNavigation()
  const {rides} = useRide()
  
 
  return (
    <SafeAreaView>
      <HStack alignItems="center" justifyContent="space-between" my={2}>
        <Button variant="unstyled" onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" size={18}/>
        </Button>
        <Heading textAlign="center" size="lg" bold>Caronas</Heading>
        <Button opacity={0} variant="unstyled">
          <FontAwesome name="chevron-left" size={14}/>
        </Button>
      </HStack>
      <Divider/>
      <ScrollView>
        <VStack mx={5} mt={5} space={4}>
          
          {rides.length > 0 ? 
          rides.map(ride => {
            return <VStack bg={{
              linearGradient: {
                colors: ['gray.100', 'green.300'],
                start: [0,1],
                end: [3,0]
              }
            }} 
            borderRadius={8} p={3} key={ride.id}
            >
              <Text fontSize="lg">{ride.origin} {<FontAwesome name="arrow-right"/>} {ride.destination}</Text>
              <Text><FontAwesome name="car"/> {ride.user.name} / Limite de vagas: {ride.passenger_limit}</Text>
            </VStack>
          }) :
          <Center mt={8} >
            <VStack justifyContent="center" alignItems="center">
              <Text fontSize="md">Ops!</Text>
              <Text> Parece não existem caronas com base no seu filtro.</Text>
            </VStack>
          </Center>
          }

          {/* <VStack bg={{
            linearGradient: {
              colors: ['gray.100', 'green.300'],
              start: [0,1],
              end: [3,0]
            }
          }}  borderRadius={8} p={3}>
            <Text fontSize="lg" >Rio das Pedras {<FontAwesome name="arrow-right"/>} Salto</Text>
            <Text><FontAwesome name="car"/> Otávio / Limite de vagas: 2</Text>
          </VStack>

          <VStack bg={{
            linearGradient: {
              colors: ['gray.100', 'green.300'],
              start: [0,1],
              end: [3,0]
            }
          }}  borderRadius={8} p={3}>
            <Text fontSize="lg">São Paulo {<FontAwesome name="arrow-right"/>} Salto</Text>
            <Text><FontAwesome name="car"/> Igor Ivanov / Limite de vagas: 2</Text>
          </VStack> */}

          

        </VStack>
      </ScrollView>
    </SafeAreaView>
  )
}