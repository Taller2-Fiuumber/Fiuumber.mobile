import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import LinkingConfiguration from './LinkingConfiguration';
import { useState, useEffect } from 'react';
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { RootStackParamList } from '../types';
import { HomeScreen } from '../screens/HomeScreen';
import { SignInScreen } from '../screens/SignInScreen';
import { SignUpScreen } from '../screens/SignUpScreen';


export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {

  const [isSignedIn, setSignedIn] = useState<boolean>(false);

  useEffect(() => {
    // Descomentar para probar el Home
    // setSignedIn(true); 
  }, []);

  return (
    <>
      <Stack.Navigator>
        {
          isSignedIn ? (
            <>
              <Stack.Screen name="Home" component={HomeScreen}/>
            </>
          ) : (
            <>
              <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
              <Stack.Screen name="SignInScreen" component={SignInScreen} options={{ headerBackButtonMenuEnabled: true, headerTransparent: true, headerTitle: '' }} />
              <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }} />
            </>
          )   
        }
      </Stack.Navigator>
    </>
  );
}