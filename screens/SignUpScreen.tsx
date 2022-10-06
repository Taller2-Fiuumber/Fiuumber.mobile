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
    colorSignIn: {
      color: Pallete.primaryColor
    },
    bgSignIn: {
      backgroundColor: Pallete.lightColor,
    },
});
export const SignUpScreen = ({ navigation }: NavigationProps) => {

  const [name, setName] = useState<string>("");  
  const [lastName, setLastName] = useState<string>("");  
  const [email, setEmail] = useState<string>("");  
  const [password, setPassword] = useState<string>("");
  const [passwordChecker, setPasswordChecker] = useState<string>("");


  const { signUp } = React.useContext(AuthContext);

    return (
      <>
      <View style={styles.container}>
        <Text style={styles.header}>Welcome!</Text>
        <Text style={styles.title}>Sign up for the Fiuumber app</Text>
        <TextInput label="Enter your name" style={{marginBottom: 20}} onChangeText={(text) => setName(text)}/>
        <TextInput label="Last name" style={{marginBottom: 20}} onChangeText={(text) => setLastName(text)}/>
        <TextInput label="Email/phone number" style={{marginBottom: 20}} onChangeText={(text) => setEmail(text)}/>
        <TextInput label="Password" style={{marginBottom: 20}} secureTextEntry={true} onChangeText={(text) => setPassword(text)}/>
        <TextInput label="Confirm Password" style={{marginBottom: 20}} secureTextEntry={true} onChangeText={(text) => setPasswordChecker(text)}/>
        <Pressable style={{...styles.button, ...styles.bgSignIn, ...{marginBottom: 20}}} onPress={() => navigation.navigate('RoleSelectionScreen')}>
              <Text style={{...styles.buttonText, ...styles.colorSignIn}}> Next</Text>
        </Pressable> 
      </View>
      </>
    );
  }
  