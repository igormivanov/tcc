import { Button, Divider, Heading, HStack, Input, Text, VStack } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";

export function EmailChange(){

  const navigation = useNavigation()

  return (
    <SafeAreaView>
      <HStack justifyContent="space-between" my={2} alignItems="center">
        <Button variant="unstyled" onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" size={18}/>
        </Button>
        <Heading fontSize="xl">Alterar E-mail</Heading>
        <Button opacity={0} variant="unstyled">
          <FontAwesome name="question-circle" size={18}/>
        </Button>
      </HStack>
      <Divider/>

      <VStack mt={8} px={4} space={4}>
        <VStack>
          <Text fontSize="md">Novo e-mail</Text>
          <Input/>
        </VStack>
        <VStack>
          <Text fontSize="md">Senha</Text>
          <Input/>
        </VStack>
        <VStack>
          <Text fontSize="md">Confirmar senha</Text>
          <Input/>
        </VStack>

        <Button backgroundColor="green.300" mt={10}>Confirmar edição</Button>
      </VStack>

      
    </SafeAreaView>
  )
}