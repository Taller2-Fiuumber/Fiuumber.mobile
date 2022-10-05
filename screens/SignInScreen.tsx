import React from "react";
import { StyleSheet } from "react-native";
import LogInForm from "../components/LogInForm";
import { Text, View } from "../components/Themed";
import { User } from "../models/user";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      backgroundColor: 'green'
    },
    title: {
        color: '#000'
    },
});
export const SignInScreen = () => {
    return (
      <View style={styles.container}>
        {/* <LogInForm></LogInForm> */}
        <Text style={styles.title}>Sign In</Text>
      </View>
    );
  }
  