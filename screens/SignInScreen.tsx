import React from "react";
import { StyleSheet } from "react-native";
import LogInForm from "../components/LogInForm";
import { Text, View } from "../components/Themed";
import { Pallete } from "../constants/Pallete";
import { User } from "../models/user";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: Pallete.greenBackground,
      padding: 20,
    },
    title: {
        color: '#000',
        marginBottom: 70,
        textAlign: 'center',
        fontSize: 24
    },
});
export const SignInScreen = () => {
  const handleLogin = (email: string, password: string) => {
    console.log(email);
    console.log(password);
    // TODO: llamar al back y loguearse
  };

    return (
      <>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome back to <Text style={{...styles.title,...{fontWeight: "bold"}}}>Fiuumber</Text>!</Text>
        <LogInForm handleLogin={handleLogin}></LogInForm>
      </View>
      </>
    );
  }
  