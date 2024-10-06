import { Box, Button, Center, Container, Divider, HStack, Heading, Icon, Input, ScrollView, Text, VStack } from "native-base";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { UserPhoto } from "@components/UserPhoto";
import defaulUserPhotoImg from '@assets/userPhotoDefault.png'
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { UserSearchNavigatorRoutesProps } from "src/routes/userSearch.routes";
import { api } from "src/service/api";
import { UserDTO } from "@dtos/UserDTO";
import { useAuth } from "@hooks/useAuth";
import { TouchableOpacity } from "react-native";


export function Search(){

  const [usersFound, setUsersFound] = useState<UserDTO[]>([])
  const {token} = useAuth()

  useEffect(() => {
    const handleGetUsers = async () => {
      try {
        const {data} = await api.get('/users', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setUsersFound(data.users)
      } catch (err) {
        throw err
      }
    }
    handleGetUsers()
  }, [])

  

  const navigation = useNavigation<UserSearchNavigatorRoutesProps>()
  const [searchText, setSearchText] = useState('');

  function handleUsersFilter(){

    if(searchText.length == 0) {
      return [];
    }

    return usersFound.filter((user) => 
      user.name.toLowerCase().startsWith(searchText.toLowerCase())
    )
  }

  return (
    <SafeAreaView>
      <Box px={4}>
        <VStack  my="4" space={2} >
          <Heading size="md" textAlign="center" bold>Procurar usuário</Heading>
          <HStack  w="100%" space={1} alignSelf="center" mb={4}>
            <Input 
              backgroundColor="gray.100" 
              placeholder="Pesquisar" 
              variant="filled" 
              width="90%" 
              borderRadius="10" 
              p={3} 
              InputLeftElement={<Icon ml="2" size="4" color="gray.400" as={<FontAwesome name="search" />} />} 
              onChangeText={(e) => setSearchText(e)}
              />
            <Button variant="unstyled" onPress={() => navigation.navigate("userSearchScreen")}>
              <FontAwesome name="close" size={18}/>
            </Button>
          </HStack>
          <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
            {handleUsersFilter().map(user => {
              return (
                <TouchableOpacity onPress={() => navigation.navigate("UserSearchProfile", {userId: user.id})}>
                  <HStack mt={2} mb={3} justifyContent="space-between" alignItems="center">
                    <HStack display="flex" >
                      <UserPhoto
                        source={defaulUserPhotoImg}
                        alt="Foto do usuário"
                        size={10}
                      />
                      <Box ml={3}>
                        <Text bold>{user.name}</Text>
                        <Text >{user.course.name} - {user.semester}° semestre</Text>
                      </Box>
                    </HStack>
                    
                  </HStack>
                  <Divider/>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
          
        </VStack>
      </Box>
    </SafeAreaView>
  )
}