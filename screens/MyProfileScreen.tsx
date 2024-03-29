import * as React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, StatusBar} from "react-native";
import { View } from "../components/Themed";
import { Pallete } from '../constants/Pallete';
import { AuthService } from '../services/AuthService';
import {PassengerProfileForm} from "../components/PassengerProfileForm";
import {DriverProfileForm} from "../components/DriverProfileForm";

import AuthContext from "../contexts/AuthContext";

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: Pallete.whiteColor,
      paddingTop: StatusBar.currentHeight,

    },
    scrollView: {
      marginHorizontal: "3%",
    },
    contentContainer: {
      flex: 1,
      margin: "5%",
      backgroundColor: Pallete.whiteColor,
    },
    description: {
      color: Pallete.contentColor,
      fontSize: 16,
      textAlign: 'center',
    },
    title: {
      fontSize: 35,
      fontWeight: 'bold',
      color: Pallete.darkColor,
      textAlign: "center",
      margin: '3%',
    },
});

export const MyProfileScreen = () => {

  const { logIn } = React.useContext(AuthContext);

    const user = AuthService.getCurrentUserToken()?.user;

    return (
      <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.contentContainer}>
          { user?.profile == "PASSENGER" ?
            <PassengerProfileForm></PassengerProfileForm> :
            <DriverProfileForm></DriverProfileForm>
          }
        </View>
        </ScrollView>
    </SafeAreaView>
    );
  }

  export default MyProfileScreen;
