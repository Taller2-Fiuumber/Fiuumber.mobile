import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [
    Linking.createURL('/')
  ],
  config: {
    screens: {
      WelcomeScreen: '',
      SignInScreen: 'SignIn',
      SignUpScreen: 'SignUp',
      PantallaXD: 'Pantalla',
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
