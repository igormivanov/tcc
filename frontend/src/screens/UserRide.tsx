import { Box, Button, Center, CheckIcon, Divider, Heading, HStack, Icon, Input, Modal, Pressable, Select, Text, VStack } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import React, { useEffect, useState  } from "react";
import { ProfileNavigatorRoutesProps } from "src/routes/profile.routes";
import { useRide } from "@hooks/useRide";
import { useCity } from "@hooks/useCity";
import { useAuth } from "@hooks/useAuth";

export function UserRide(){

  const navigation = useNavigation<ProfileNavigatorRoutesProps>()
  const {user, setUser} = useAuth()
  const {deleteRide} = useRide()



  const [modalVisible, setModalVisible] = React.useState(false);

  const handleDelete = async ()  => {
    setModalVisible(false)
    await deleteRide()

    setUser(prev => ({
      ...prev,
      Ride: undefined
    }));
  }

  return (
    <SafeAreaView>
      <HStack justifyContent="space-between" my={2} alignItems="center">
        <Button variant="unstyled" onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" size={18}/>
        </Button>
        <Heading fontSize="xl">Minha carona</Heading>
        <Button opacity={0} variant="unstyled">
          <FontAwesome name="question-circle" size={18}/>
        </Button>
      </HStack>
      <Divider/>
      {user.ride ? <Box position="relative" mx={6} mt={8}>
        <VStack bg={{
          linearGradient: {
            colors: ['gray.100', 'green.300'],
            start: [0,1],
            end: [3,0]
          }
        }} 
        borderRadius={8} p={3}
        position="relative"
        >
          <HStack justifyContent="space-around" alignItems="center">
            <VStack alignItems="center">
            <Text fontSize="xs">Origem</Text>
            <Text fontSize="md" fontWeight="">{user.ride?.origin}</Text>
            </VStack>
            <FontAwesome size={20} name="arrow-right"/>
            <VStack alignItems="center">
            <Text>Destino</Text>
            <Text fontSize="md">{user.ride?.destination}</Text>
            </VStack>
          </HStack>

          <HStack mt={5} alignItems="center">
            <FontAwesome name="users"/>
            <Text> passageiros permitidos: {user.ride?.passenger_limit}</Text>
          </HStack>
        </VStack>
        <Pressable
          position="absolute"
          top={-10} 
          right={-10}
          p={1.5}
          bgColor="red"
          borderRadius="full"
          shadow={3}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <FontAwesome name="remove" color="white" size={15} />
        </Pressable>
      </Box> : 
        <Center mt={8} >
          <VStack justifyContent="center" alignItems="center">
            <Text fontSize="md">Ops!</Text>
            <Text>Você ainda não possui uma carona.</Text>
          </VStack>
        </Center>
      }
      <Button mt={10} mx={5} backgroundColor={user.ride ? "gray.100" : "green.300"} _text={{color: user.ride ? "gray.300" : "white"}} onPress={() => navigation.navigate("rideCreation")} disabled={!!user.ride} >Criar carona</Button>

      <Modal isOpen={modalVisible} onClose={setModalVisible} size="lg">
        <Modal.Content maxH="212">
          <Modal.Body>
              <Text>
                Tem certeza que deseja deletar a carona?
              </Text>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={() => {
              setModalVisible(false);
            }}>
                Cancel
              </Button>
              <Button 
              background="red"
              onPress={() => handleDelete()}>
                Deletar
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

    </SafeAreaView>


  )
}