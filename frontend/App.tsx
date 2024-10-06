import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { NativeBaseProvider } from 'native-base';
import { THEME } from 'src/theme';
import { Routes } from 'src/routes';
import { AuthContextProvider } from 'src/context/AuthContext';
import { Loading } from '@components/Loading';
import { LinearGradient } from 'expo-linear-gradient';
import { CityContextProvider } from 'src/context/CitiesContext';
import { RideContextProvider } from 'src/context/RideContext';
import { RepublicInterestContext, RepublicInterestContextProvider } from 'src/context/RepublicInterestContext';

export default function App() {

  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold})

  return (
    <NativeBaseProvider theme={THEME} config={{
      dependencies: {
        'linear-gradient': LinearGradient
      }
    }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <AuthContextProvider>
        <CityContextProvider>
          <RideContextProvider>
            <RepublicInterestContextProvider>
              {fontsLoaded ? <Routes /> : <Loading />}
            </RepublicInterestContextProvider>
          </RideContextProvider>
        </CityContextProvider>
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}


