import React from "react";
import { StyleSheet } from "react-native";
import SignUpForm from "../components/SignUpForm";
import { Text, View } from "../components/Themed";
import { Pallete } from "../constants/Pallete";
import AuthContext from "../contexts/AuthContext";
import { NavigationProps } from "../types";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: Pallete.greenBackground,
      padding: 20,
    },
    header: {
      color: '#000',
      marginBottom: 20,
      textAlign: 'center', 
      fontSize: 30
  },
    title: {
        color: '#000',
        marginBottom: 70,
        textAlign: 'left', 
        fontSize: 24
    },
});
export const SignUpScreen = () => {

  const { SignUp } = React.useContext(AuthContext);

    return (
      <>
      <View style={styles.container}>
        <Text style={styles.header}>Welcome!</Text>
        <Text style={styles.title}>Sign up for the Fiuumber app</Text>
        <SignUpForm handleSignUp={SignUp}></SignUpForm>
      </View>
      </>
    );
  }
  