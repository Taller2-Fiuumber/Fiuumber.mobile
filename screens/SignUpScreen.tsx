import React, { FC, ReactElement } from "react";
import { useState } from "react";
// import SignUpForm from "../components/SignUpForm";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Pallete } from "../constants/Pallete";
import AuthContext from "../contexts/AuthContext";
import { NavigationProps } from "../types";
import { TextInput, Button } from "react-native-paper";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import axios from "axios";

// import * as dotenv from "dotenv";
import { Passenger } from "../models/passenger";
import { Wallet } from "../models/wallet";
import { StorageService } from "../services/StorageService";

// dotenv.config();



export const SignUpScreen= ({ navigation }: NavigationProps) => {
  const [showPasswordErrorText, setPasswordErrorText] = useState(false);
  const [showMissingFieldsErrorText, setMissingFieldsErrorText] = useState(false);
  const [showPasswordIsTooShortErrorText, setPasswordIsTooShortErrorText] = useState(false);

  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordChecker, setPasswordChecker] = useState<string>("");

  const [post, setPost] = React.useState(null);


  const onSignUp = async () => {
    if (name == "" || lastName == "" || email == "" || password == "" || passwordChecker == ""){
      setMissingFieldsErrorText(true);
    }
    else if (password.length < 8) {
      setMissingFieldsErrorText(false);
      setPasswordIsTooShortErrorText(true);
    }
    else if (password != passwordChecker) {
      setMissingFieldsErrorText(false);
      setPasswordIsTooShortErrorText(false);
      setPasswordErrorText(true);
    }
    else {
      setMissingFieldsErrorText(false);
      setPasswordIsTooShortErrorText(false);
      setPasswordErrorText(false);
      // Lógica de guardarse la info que ingrese (ya validada)
      // let url = process.env.API_USERS_URL;
      // axios.post((url + "/users")  || "", {
      //   name: name,
      //   lastName: lastName,
      //   email: email,
      //   password: password,
      // })
      // .then((response) => {
      //   setPost(response.data);
      // });
      //-----------------------------------------------------
      
      const passenger: Passenger = new Passenger(-1, email, name, lastName, "", new Wallet("", "address", "password"), password);
      await StorageService.storeData("temp_user", JSON.stringify(passenger));
      navigation.navigate('RoleSelectionScreen')
    }

  }
  //--------------------------------------------------------------------------------
  //Esto lo vamos a refactorizar y hacer todo el post y get en otro modulo
  
  // let url = process.env.API_USERS_URL;   
  // React.useEffect(() => {
  //   axios.get(`${(url + "/users")}/1`).then((response) => {
  //     setPost(response.data);
  //   });
  // }, []);

  



  //-------------------------------------------------------------------------------
    return (
      <>
      <View style={styles.container}>
        <Text style={styles.header}>Welcome!</Text>
        <Text style={styles.title}>Sign up for the Fiuumber app</Text>
        <TextInput label="Enter your name" style={{marginBottom: 20}} onChangeText={(text) => setName(text)}/>
        <TextInput label="Last name" style={{marginBottom: 20}} onChangeText={(text) => setLastName(text)}/>
        <TextInput label="Email or phone number" style={{marginBottom: 20}} onChangeText={(text) => setEmail(text)}/>
        <TextInput label="Password" style={{marginBottom: 20}} secureTextEntry={true} onChangeText={(text) => setPassword(text)}/>
        <TextInput label="Confirm Password" style={{marginBottom: 20}} secureTextEntry={true} onChangeText={(text) => setPasswordChecker(text)}/>
        {showMissingFieldsErrorText ? <Text style={styles.error}>Complete missing fields!</Text> : null}
        {showPasswordIsTooShortErrorText ? <Text style={styles.error}>Password should be at least 8 characters long!</Text> : null}
        {showPasswordErrorText ? <Text style={styles.error}>Passwords do not match. Retry!</Text> : null}
        <Button mode="contained" style={{backgroundColor: Pallete.primaryColor}} onPress={onSignUp}>Next</Button>
      </View>
      </>

    );
  }

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
        textAlign: 'center',
        fontSize: 24
    },
    error: {
      color: '#FF0000',
      marginBottom: 10,
      textAlign: 'center',
      justifyContent: 'center',
      fontSize: 20,
      fontWeight: 'bold',
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
