import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import LinkingConfiguration from './LinkingConfiguration';
import { OnBoardingScreen } from '../screens/OnBoardingScreen';
import { RootStackParamList } from '../types';
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { ProfileNavBarScreen } from '../screens/ProfileNavBarScreen';
import { MyProfileScreen } from '../screens/MyProfileScreen';
import { LogInScreen } from '../screens/LogInScreen';
import { SignUpScreen } from '../screens/SignUpScreen';
import { RoleSelectionScreen } from '../screens/RoleSelectionScreen';
import { VehicleDataScreen } from '../screens/VehicleDataScreen';
import { SignUpSuccessfullyScreen } from '../screens/SignUpSuccessfullyScreen';
import { CalificationScreen } from '../screens/CalificationScreen';
import AuthContext from '../contexts/AuthContext';
import { UserToken } from '../models/user-token';
import { AuthAction } from '../models/auth-action';
import { AuthService } from '../services/AuthService';
import { CONFIG } from '../config';
import { Passenger } from '../models/passenger';
import { Wallet } from '../models/wallet';
import MyBalanceScreen from '../screens/MyBalanceScreen';

import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform, Text } from 'react-native';
import NotificationsContext from '../contexts/NotificationsContext';
import { UsersService } from '../services/UsersService';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {

  const [state, dispatch] = React.useReducer(
    (prevState: any, action: AuthAction) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          AuthService.setCurrentUserToken(action.userToken);
          return {
            ...prevState,
            userToken: action.userToken,
            isLoading: false,
          };
        case 'SIGN_IN':
          AuthService.setCurrentUserToken(action.userToken);
          return {
            ...prevState,
            isSignout: false,
            userToken: action.userToken,
          };
        case 'SIGN_OUT':
          AuthService.setCurrentUserToken(null);
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
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
      dispatch({ type: 'RESTORE_TOKEN', userToken: userToken });
    };

    bootstrapAsync();

    registerForPushNotificationsAsync();
    Notifications.addNotificationReceivedListener(handleNotification);
    Notifications.addNotificationResponseReceivedListener(handleNotificationResponse);
  }, []);

  const authContext = React.useMemo(
    () => ({
      logIn: async (email: string, password: string): Promise<string | null> => {

        if (CONFIG.bypassLogin) {
          const userToken: UserToken = {
            user: new Passenger(666, "email", "firstName", "lastName", "address", "password", "username", new Wallet(-1, "address", "password")),
            token: 'EL_TOKEN'
          }
          const authAction: AuthAction = { userToken: userToken, type: 'SIGN_IN' };
          dispatch(authAction);
          return null;
        }

        const userToken: UserToken | null = await AuthService.login(email, password);

        if (!userToken) {
          return "Usuario o contraseña incorrectos";
        }

        if (userToken.user.blocked) {
          return "Usuario Bloqueado";
        }

        const authAction: AuthAction = { userToken: userToken, type: 'SIGN_IN' };

        dispatch(authAction);

        // await UsersService.setNotificationsToken(userToken.user.id, expoPushToken);

        return null;
      },
      signOut: () => dispatch({ type: 'SIGN_OUT', userToken: null }),
      signUp: async (_data: any) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_UP', userToken: null });
      },
    }),
    []
  );

  const [expoPushToken, setExpoPushToken] = React.useState<string>("");
  const [notification, setNotification] = React.useState<Notifications.Notification | null>(null);

  const registerForPushNotificationsAsync = async () => {
    try {
      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!');
          return;
        }
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
        setExpoPushToken(token);
      } else {
        alert('Must use physical device for Push Notifications');
      }

      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
    }
    catch (e) {
      console.error("Error in registerForPushNotificationsAsync(): " + e);
    }
  };

  const handleNotification = (notification: Notifications.Notification) => {
    console.log(notification);
    setNotification(notification);
  }

  const handleNotificationResponse = (response: Notifications.NotificationResponse) => {
    console.log(response);
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NotificationsContext.Provider value={notification}>
        <NavigationContainer
          linking={LinkingConfiguration}
          theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack.Navigator>
            {
              state.userToken !== null ? (
                <>
                  <Stack.Screen name="ProfileNavBarScreen" component={ProfileNavBarScreen} options={{ headerShown: false }} />
                </>
              ) : (
                <>
                  <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
                  <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} options={{ headerShown: false }} />
                  <Stack.Screen name="LogInScreen" component={LogInScreen} options={{ headerBackButtonMenuEnabled: true, headerTransparent: true, headerTitle: '' }} />
                  <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerBackButtonMenuEnabled: true, headerTransparent: true, headerTitle: '' }} />
                  <Stack.Screen name="RoleSelectionScreen" component={RoleSelectionScreen} options={{ headerBackButtonMenuEnabled: true, headerTransparent: true, headerTitle: '' }} />
                  <Stack.Screen name="VehicleDataScreen" component={VehicleDataScreen} options={{ headerBackButtonMenuEnabled: true, headerTransparent: true, headerTitle: '' }} />
                  <Stack.Screen name="SignUpSuccessfullyScreen" component={SignUpSuccessfullyScreen} options={{ headerBackButtonMenuEnabled: true, headerTransparent: true, headerTitle: '' }} />
                  <Stack.Screen name="MyProfileScreen" component={MyProfileScreen} options={{ headerBackButtonMenuEnabled: true, headerTransparent: true, headerTitle: '' }} />
                  <Stack.Screen name="CalificationScreen" component={CalificationScreen} options={{ headerBackButtonMenuEnabled: true, headerTransparent: true, headerTitle: '' }} />
                  <Stack.Screen name="MyBalanceScreen" component={MyBalanceScreen} options={{ headerBackButtonMenuEnabled: true, headerTransparent: true, headerTitle: '' }} />
                </>
              )
            }
          </Stack.Navigator>

        </NavigationContainer>
      </NotificationsContext.Provider>
    </AuthContext.Provider>
  );
}