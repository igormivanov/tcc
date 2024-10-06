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
import { useRepublicInterest } from "@hooks/useRepublicInterest";
import { fi } from "date-fns/locale";

export function UsuarioInteresseRepublica1(){

  const navigation = useNavigation<ProfileNavigatorRoutesProps>()
  const {user, findUserById} = useAuth()
  const {deleteRepublicInterest} = useRepublicInterest()



  const [modalVisible, setModalVisible] = React.useState(false);

  const handleDelete = async ()  => {
    setModalVisible(false)
    await deleteRepublicInterest()
    await findUserById()
  }

  const republicPreferencesRender = (preferences: string): string => {
		switch (preferences) {
			case 'ANYONE':
        return "Ambos gêneros"
      case 'MAN':
        return "Apenas Homens"
      case 'WOMAN':
        return "Apenas Mulheres";
      default:
        return ""
		}	 
	}

  return (
    <SafeAreaView>
      <HStack justifyContent="space-between" my={2} alignItems="center">
        <Button variant="unstyled" onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" size={18}/>
        </Button>
        <Heading fontSize="xl">Meu Interesse em República</Heading>
        <Button opacity={0} variant="unstyled">
          <FontAwesome name="question-circle" size={18}/>
        </Button>
      </HStack>
      <Divider/>
      {user.republicInterest ? <Box position="relative" mx={6} mt={8}>
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
          <HStack alignItems="center">
            <VStack alignItems="center" w="50%">
            <Text fontSize="xs">Preferência</Text>
            <Text fontSize="sm" fontWeight="">{republicPreferencesRender(user.republicInterest.preferences.toString())}</Text>
            </VStack>
            {/* <FontAwesome size={20} name="arrow-right"/> */}
            <Divider orientation="vertical" background="gray.700"/>
            <VStack alignItems="center" w="50%">
            <Text>N° moradores</Text>
            <Text fontSize="md">{user.republicInterest.resident_limit}</Text>
            </VStack>
          </HStack>

          {/* <HStack mt={5} alignItems="center">
            <FontAwesome name="users"/>
            <Text> passageiros permitidos: </Text>
          </HStack> */}
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
            <Text>Você ainda não sinalizou interesse em república.</Text>
          </VStack>
        </Center>
      }
      <Button mt={10} mx={5} backgroundColor={user.republicInterest ? "gray.100" : "green.300"} _text={{color: user.republicInterest ? "gray.300" : "white"}} onPress={() => navigation.navigate("usuarioInteresseRepublica")} disabled={!!user.republicInterest} >Criar Interesse</Button>

      <Modal isOpen={modalVisible} onClose={setModalVisible} size="lg">
        <Modal.Content maxH="212">
          <Modal.Body>
              <Text>
                Tem certeza que deseja remover o interesse em república?
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