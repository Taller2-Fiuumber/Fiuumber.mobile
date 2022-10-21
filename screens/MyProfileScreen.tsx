import * as React from 'react';
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { Pallete } from '../constants/Pallete';
import { User } from '../models/user';
import { AuthService } from '../services/AuthService';

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: Pallete.whiteColor,
      padding: 20,
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
      marginBottom:'3%',
      paddingBottom: "10%"
    },
});
export const MyProfileScreen = () => {

  const user: User | undefined = AuthService.getCurrentUserToken()?.user;

    return (
        <View style={styles.container}>
             <Text style={styles.title}>Hello, {user?.profile}!</Text>


        </View>

    );
  }

  export default MyProfileScreen;
