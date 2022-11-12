import * as React from 'react';
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { Pallete } from '../constants/Pallete';
import { DirectionsBoxNative } from '../components/DirectionsBoxNative';
import { User } from '../models/user';
import { AuthService } from '../services/AuthService';
import DriverHomeScreen from './DriverHomeScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Pallete.greenBackground,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: Pallete.greenBackground,
  },
  title: {
    color: Pallete.darkColor,
    textAlign: 'center',
    fontSize: 18
  },
});
export const TripScreen = () => {

  const user: User | undefined = AuthService.getCurrentUserToken()?.user;

  return (
    <>
      {user?.profile == "DRIVER" ?
        <DriverHomeScreen></DriverHomeScreen> :
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <DirectionsBoxNative></DirectionsBoxNative>
          </View>
        </View>}
    </>
  );
}

export default TripScreen;
