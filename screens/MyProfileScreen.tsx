import * as React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, StatusBar} from "react-native";
import { Text, View } from "../components/Themed";
import { Pallete } from '../constants/Pallete';
import { User } from '../models/user';
import { AuthService } from '../services/AuthService';
import {PassengerProfileForm} from "../components/PassengerProfileForm";
import { useState } from "react";
import AuthContext from "../contexts/AuthContext";

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: Pallete.whiteColor,
      paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
      marginHorizontal: "2%",
    },
    contentContainer: {
      flex: 1,
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
    subtitle: {
      fontSize: 25,
      color: Pallete.greenBackground,
      textAlign: "left",
      margin:'3%',
    },
});

export const MyProfileScreen = () => {

  const { logIn } = React.useContext(AuthContext);

  const [message, setMessage] = useState<string | null>(null);

  const handleEditUserBasicInfo = async (user: User) => {
    //const message = await logIn(email, password);
    //setMessage(message);
  }


    return (
      <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
             <Text style={styles.subtitle}>Personal information</Text>

              <PassengerProfileForm></PassengerProfileForm>
        </View>
        </ScrollView>
    </SafeAreaView>
    );
  }

  export default MyProfileScreen;
