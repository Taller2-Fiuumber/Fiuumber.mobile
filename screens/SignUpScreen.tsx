import React from "react";
import { useState } from "react";
import SignUpForm from "../components/SignUpForm";

import { Pallete } from "../constants/Pallete";
import AuthContext from "../contexts/AuthContext";
import { NavigationProps } from "../types";
import { TextInput, Button } from 'react-native-paper';
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

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
    button: {
      borderRadius: 100,
      width: '100%',
      border: 'none',
      height: 55,
      justifyContent: 'center',
    },
    buttonText: {
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
    },
    colorLogIn: {
      color: Pallete.primaryColor
    },
    bgLogIn: {
      backgroundColor: Pallete.lightColor,
    },
});

export const SignUpScreen = () => {

  const { signUp } = React.useContext(AuthContext);


    return (
      <>
      <View style={styles.container}>
        <Text style={styles.header}>Welcome!</Text>
        <Text style={styles.title}>Sign up for the Fiuumber app</Text>
        <SignUpForm handleSignUp={signUp}></SignUpForm>
      </View>
      </>
    );
  }
  

