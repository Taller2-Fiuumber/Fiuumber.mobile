import React, { FC, ReactElement } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from 'react-native-paper';
import { useState } from "react";
import { Pallete } from "../constants/Pallete";
import { NavigationProps } from "../types";


interface SignUpFormProps {
  //Ver que chequee que la pass == passcheck
  handleSignUp: (name: string, lastName: string, email: string, password: string, passwordChecker: string) => void;
}

export const SignUpForm: FC<SignUpFormProps> = ({handleSignUp}: SignUpFormProps,{ navigation }: NavigationProps): ReactElement => {

  const [name, setName] = useState<string>("");  
  const [lastName, setLastName] = useState<string>("");  
  const [email, setEmail] = useState<string>("");  
  const [password, setPassword] = useState<string>("");
  const [passwordChecker, setPasswordChecker] = useState<string>("");

  const onSignUp = () => handleSignUp(name, lastName, email, password, passwordChecker);

  // TODO:
  // Validar email con una regex

  return (
    <>
    <TextInput label="Enter your name" style={{marginBottom: 20}} onChangeText={(text) => setName(text)}/>
    <TextInput label="Last name" style={{marginBottom: 20}} onChangeText={(text) => setLastName(text)}/>
    <TextInput label="Email/phone number" style={{marginBottom: 20}} onChangeText={(text) => setEmail(text)}/>
    <TextInput label="Password" style={{marginBottom: 20}} secureTextEntry={true} onChangeText={(text) => setPassword(text)}/>
    <TextInput label="Confirm Password" style={{marginBottom: 20}} secureTextEntry={true} onChangeText={(text) => setPasswordChecker(text)}/>
    <Pressable style={{...styles.button}} onPress={() => navigation.navigate('RoleSelectionScreen')}>
          <Text style={{...styles.buttonText}}> Next</Text>
    </Pressable>
    </>      
  );

};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Pallete.darkBackground,
    fontFamily: 'Roboto',
  },
  container: {
    position: 'absolute',
    bottom: '5%',
    left: 0,
    right: 0,
    padding: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 0,
    marginBottom: 0,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: Pallete.whiteColor,
    margin: 0
  },
  description: {
    fontSize: 15,
    fontWeight: 'normal',
    color: '#8E8E8E',
    marginBottom: 20
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
  bgSignUp: {
    backgroundColor: Pallete.primaryColor,
  },
  colorSignUp: {
    color: Pallete.lightColor,
  },

});
export default SignUpForm;
