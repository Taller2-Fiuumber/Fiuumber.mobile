import React, { FC, ReactElement } from "react";
import { TextInput, Button } from 'react-native-paper';
import { useState } from "react";
import { Pallete } from "../constants/Pallete";

interface SignUpFormProps {
  //Ver que chequee que la pass == passcheck
  handleSignUp: (name: string, lastName: string, email: string, password: string, passwordChecker: string) => void;
}

export const SignUpForm: FC<SignUpFormProps> = ({handleSignUp}: SignUpFormProps): ReactElement => {

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
    <Button mode="contained" style={{backgroundColor: Pallete.primaryColor}} onPress={onSignUp}>Sign Up</Button>
    </>      
  );
};

export default SignUpForm;