import { Box, Button, HStack, Input, Text, VStack } from "native-base";
import { SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useCity } from "@hooks/useCity";

export function CitySearch({route}){

  const navigation = useNavigation()

  const {cities, getCities, setCitySearch, citySearch} = useCity()
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getCitiesHandler = async () => {
      
      try {
        if (cities.length == 0) {
          await getCities()
          console.log(cities)
        } 
      } catch (err) {
        throw err
      }
    }
    getCitiesHandler()
  }, [])

  const { type } = route.params

  function removeAccentsAndLowerCase(str: string): string {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  const filteredCities = cities.filter(city => {
    if (search === '') {
      return false
    }
    return removeAccentsAndLowerCase(city.name).includes(removeAccentsAndLowerCase(search))
  });

  // function handleCityChoice() {
  //   switch(type) {
  //     case 'createFrom':
  //       setUser({rideFrom: "São Paulo"})
  //   }
  // }

  function handleCityChoice(city: string) {
    if (type == "origin") {
      setCitySearch({...citySearch, origin: city})
      navigation.goBack()
    }

    if (type == "destination") {
      setCitySearch({...citySearch, destination: city})
      navigation.goBack()
    }
  }
  


  return (
    <SafeAreaView>
      <VStack mx={5} my={5} space={10}>
        <HStack space={4}>
          <Button variant="unstyled" onPress={() => navigation.goBack()}>
            <FontAwesome name="chevron-left" size={14}/>
          </Button>
          <Input 
            placeholder="Digite a cidade principal"
            size={2}
            flex={1} 
            variant="unstyled" 
            borderBottomWidth={1} 
            borderRadius={0}
            _focus={{borderBottomColor: "gray.200"}}
            value={search}
            onChangeText={(e) => setSearch(e)}
            />

        </HStack>
        <ScrollView contentContainerStyle={{ paddingBottom: 160 }}>
        <VStack space={4}>
          {filteredCities.map(item => {
            return (
              <TouchableOpacity key={item.id} onPress={() => handleCityChoice(item.name)}>
                <HStack 
                  p={2} 
                  borderBottomColor="gray.100" 
                  borderBottomWidth={1} 
                  justifyContent="space-between" 
                  alignItems="center"
                >
                  <Box>
                    <Text fontSize="lg" fontWeight="bold" >{item.name}</Text>
                    <Text fontSize="xs" color="gray.300">SP, BRASIL</Text>
                  </Box>
                  <Button variant="unstyled">
                    <FontAwesome name="chevron-right" size={14} color={"gray"} />
                  </Button>
                </HStack>
              </TouchableOpacity>
            )
          })}
          
        </VStack>
        </ScrollView>        
      </VStack>
    </SafeAreaView>
  )
}