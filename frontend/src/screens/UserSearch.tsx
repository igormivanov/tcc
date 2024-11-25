import { Box, Button, Center, Container, Divider, HStack, Heading, Icon, Input, ScrollView, Text, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from 'react-native';
import { UserPhoto } from "@components/UserPhoto";
import defaulUserPhotoImg from '@assets/userPhotoDefault.png'
import { useNavigation } from "@react-navigation/native";
import { UserSearchNavigatorRoutesProps } from "src/routes/userSearch.routes";
import { useAuth } from "@hooks/useAuth";
import { api } from "src/service/api";
import { FriendDTO } from "@dtos/FriendDTO";
import { useFollower } from "@hooks/useFollower";

export function UserSearch() {

  const navigation = useNavigation<UserSearchNavigatorRoutesProps>()
  const [searchText, setSearchText] = useState('');
  const {getUserFollowers, userFollowers} = useFollower()

  useEffect(() => {
    getUserFollowers() 
  }, [])

  

  function handleUserFriendsFilter(){

    // if(searchText.length == 0) {
    //   return [];
    // }

    return userFollowers.filter((user) => 
      user.name.toLowerCase().startsWith(searchText.toLowerCase())
    )
  }

  return (
    <SafeAreaView>
      <Box px={4}>
        <VStack  my="4" space={2} >
          <Heading size="xl" bold>Favoritos</Heading>
          <HStack  w="100%" space={1} alignSelf="center">
            <Input  onChangeText={(e) => setSearchText(e)} backgroundColor="gray.100" placeholder="Pesquisar" variant="filled" width="90%" borderRadius="10" p={3} InputLeftElement={<Icon ml="2" size="4" color="gray.400" as={<FontAwesome name="search" />} />} />
            <Button variant="unstyled" onPress={() => navigation.navigate('search')}>
              <FontAwesome name="plus" size={18}/>
            </Button>
          </HStack>
          <ScrollView h="100%">
          {
            handleUserFriendsFilter().map(friend => {
              return (
              <TouchableOpacity key={friend.id} onPress={() => navigation.navigate("UserSearchProfile", {userId: friend.id})}>
                <HStack mt={5} alignItems="center">
                  <UserPhoto
                    source={defaulUserPhotoImg}
                    alt="Foto do usuário"
                    size={50}
                  />
                  <Box flex={1} ml={4}>
                    <Text bold>{friend.name}</Text>
                    <Text>{friend.course.name} - {friend.semester}° semestre</Text>
                  </Box>
                </HStack>
                <Divider mt={1}/>
              </TouchableOpacity>
            )})
          }
          </ScrollView>
          
        </VStack>
      </Box>
    </SafeAreaView>
)
}