import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [
    Linking.createURL('/')
  ],
  config: {
    screens: {
      WelcomeScreen: 'Welcome',
      OnBoardingScreen:'OnBoarding',
      LogInScreen: 'LogIn',
      SignUpScreen: 'SignUp',
      RoleSelectionScreen: 'RoleSelection',
      PantallaXD: 'Pantalla',
      VehicleDataScreen: 'VehicleData',
      SignUpSuccesfullyScreen: 'SignUpSuccesfully'
    //   Root: {
    //     screens: {
    //       TabOne: {
    //         screens: {
    //           TabOneScreen: 'one',
    //         },
    //       },
    //       TabTwo: {
    //         screens: {
    //           TabTwoScreen: 'two',
    //         },
    //       },
    //     },
    //   },
    //   Modal: 'modal',
    //   NotFound: '*',
      
    }
  },
};

export default linking;
