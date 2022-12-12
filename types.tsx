/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

export type RootStackParamList = {
  // PrincipalScreen: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  Home: undefined;
  HomeDriver: undefined;
  LogInScreen: undefined;
  SignUpScreen: undefined;
  WelcomeScreen: undefined;
  OnBoardingScreen: undefined;
  VehicleDataScreen: undefined,
  RoleSelectionScreen: undefined;
  CalificationScreen: undefined;
  SignUpSuccessfullyScreen: undefined;
  TripScreen: undefined;
  TripLogScreen: undefined;
  ProfileNavBarScreen: undefined;
  MyProfileScreen: undefined;
  HomeScreen: undefined;
  MyBalanceScreen: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;
export type NavigationProps = {
  navigation: ProfileScreenNavigationProp;
};
