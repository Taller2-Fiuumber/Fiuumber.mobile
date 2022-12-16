import * as React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, StatusBar} from "react-native";
import { Text, View } from "../components/Themed";
import { Pallete } from '../constants/Pallete';
import { User } from '../models/user';
import { AuthService } from '../services/AuthService';
import {PassengerPublicProfileForm} from "../components/PassengerPublicProfileForm";
import {DriverPublicProfileForm} from "../components/DriverPublicProfileForm";

import { useState } from "react";
import AuthContext from "../contexts/AuthContext";

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: Pallete.whiteColor,
      paddingTop: StatusBar.currentHeight,

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

export const OthersProfileScreen = () => {

  const { logIn } = React.useContext(AuthContext);

  const [message, setMessage] = useState<string | null>(null);

  const handleEditUserBasicInfo = async (user: User) => {
    //const message = await logIn(email, password);
    //setMessage(message);
  }

    const user = AuthService.getCurrentUserToken()?.user;

    return (

        <View style={styles.contentContainer}>
          { user?.profile == "PASSENGER" ?
            <DriverPublicProfileForm></DriverPublicProfileForm>:
            <PassengerPublicProfileForm></PassengerPublicProfileForm>
          }
        </View>
       
    );
  }

  export default OthersProfileScreen;