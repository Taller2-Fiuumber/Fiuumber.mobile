import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import LinkingConfiguration from './LinkingConfiguration';
import { OnBoardingScreen } from '../screens/OnBoardingScreen';
import { RootStackParamList } from '../types';
import { HomeScreen } from '../screens/HomeScreen';
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { SignInScreen } from '../screens/SignInScreen';
import { SignUpScreen } from '../screens/SignUpScreen';
import { RoleSelectionScreen } from '../screens/RoleSelectionScreen';
import { DriverRoleFormScreen } from '../screens/DriverRoleFormScreen';
import AuthContext from '../contexts/AuthContext';
//import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {

  const [state, dispatch] = React.useReducer(
    (prevState: any, action: any) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_UP':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
        case 'VEHICLE_DATA':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken = null;

      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        // userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (_data: any) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (_data: any) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_UP', token: 'dummy-auth-token' });
      },
      vehicleData: async (_data: any) => {
        dispatch({ type: 'VEHICLE_DATA', token: 'dummy-auth-token' });
      },
    }),
    []
  );
  
  return (
      <AuthContext.Provider value={authContext}>
       <NavigationContainer
        linking={LinkingConfiguration}
        theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator>
        {
          state.userToken !== null ? (
            <>
              <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
            </>
          ) : (
            <>
              <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
              <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} options={{ headerShown: false }} />
              <Stack.Screen name="SignInScreen" component={SignInScreen} options={{ headerBackButtonMenuEnabled: true, headerTransparent: true, headerTitle: '' }} />
              <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerBackButtonMenuEnabled: true, headerTransparent: true, headerTitle: '' }} />
              <Stack.Screen name="RoleSelectionScreen" component={RoleSelectionScreen} options={{ headerBackButtonMenuEnabled: true, headerTransparent: true, headerTitle: '' }} />
              <Stack.Screen name="DriverRoleFormScreen" component={DriverRoleFormScreen} options={{ headerBackButtonMenuEnabled: true, headerTransparent: true, headerTitle: '' }} />
            </>
          )   
        }    
      </Stack.Navigator>

      </NavigationContainer>
    </AuthContext.Provider>
  );
}