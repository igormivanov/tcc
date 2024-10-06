import { Box, Button, Divider, Heading, HStack, Text, VStack } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { ProfileNavigatorRoutesProps } from "src/routes/profile.routes";
import { useAuth } from "@hooks/useAuth";
import { AuthNavigatorRoutesProps } from "src/routes/auth.routes";

export function Settings(){

  const navigation = useNavigation<ProfileNavigatorRoutesProps>()
  // const authNavigation = useNavigation<AuthNavigatorRoutesProps>()
  const {signOut} = useAuth()

  function handleLogout() {
    console.log("entrei")
    signOut()
    navigation.navigate("signIn")
  }

  return (
    <SafeAreaView style={{flex: 1,}}>
      <HStack justifyContent="space-between" my={2}>
        <Button variant="unstyled" onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" size={18}/>
        </Button>
        <Button variant="unstyled" onPress={() => navigation.goBack()}>
          <FontAwesome name="question-circle" size={18}/>
        </Button>
      </HStack>
      <Divider/>
      <VStack flex={1} justifyContent="space-between">
        <VStack >
          <HStack justifyContent="center" mb={8} mt={8}>
            <Heading size="lg"fontWeight="bold" textAlign="center" bold>Configurações</Heading>
          </HStack>
          <TouchableOpacity onPress={() => navigation.navigate("preferences")}>
            <HStack p={3}  alignItems="center" space={2}>
              <Box w="8%"><FontAwesome name="id-badge" size={20} /></Box>
              <Text  marginLeft={3} fontSize="lg">Preferêcias da Conta</Text>
            </HStack>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("emailChange")}>
            <HStack p={3}  alignItems="center" space={2}>
              <Box w="8%"><FontAwesome name="envelope-o" size={20} /></Box>
              <Text marginLeft={3} fontSize="lg">Alterar E-mail</Text>
            </HStack>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("passwordChange")}>
            <HStack p={3}  alignItems="center" space={2}>
            <Box w="8%"><FontAwesome name="lock" size={20} /></Box>
              <Text marginLeft={3} fontSize="lg">Alterar senha</Text>
            </HStack>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("userRide")}>
            <HStack p={3}  alignItems="center" space={2}>
              <Box w="8%"><FontAwesome name="car" size={20} /></Box>
              <Text marginLeft={3} fontSize="lg">Carona</Text>
            </HStack>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("usuarioInteresseRepublica1")}>
            <HStack p={3}  alignItems="center" space={2}>
            <Box w="8%"><FontAwesome name="hotel" size={20} /></Box>
              <Text marginLeft={3} fontSize="lg">Interesse em república</Text>
            </HStack>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("userInterest")}>
            <HStack p={3}  alignItems="center" space={2}>
            <Box w="8%"><FontAwesome name="tag" size={20} /></Box>
              <Text marginLeft={3} fontSize="lg">Meus interesses</Text>
            </HStack>
          </TouchableOpacity>
        </VStack>
        <TouchableOpacity onPress={() => handleLogout()}>
          <HStack p={3}  alignItems="center" space={2}>
          <Box w="8%"><FontAwesome name="sign-out" size={20} /></Box>
            <Text marginLeft={3} fontSize="lg">Sair</Text>
          </HStack>
        </TouchableOpacity>
      </VStack>
        
      {/* </VStack> */}

      
    </SafeAreaView>
  )
}