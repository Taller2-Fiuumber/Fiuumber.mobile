import React, { FC, ReactElement, useState, useEffect } from "react";
// import SignUpForm from "../components/SignUpForm";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Pallete } from "../constants/Pallete";
import AuthContext from "../contexts/AuthContext";
import { NavigationProps } from "../types";
import { TextInput, Button } from "react-native-paper";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import axios from "axios";
import {AuthService} from "../services/AuthService";
// import * as dotenv from "dotenv";
import { Passenger } from "../models/passenger";
import { Driver } from "../models/driver";
import { DriverVehicle } from "../models/driver_vehicle";
import { Vehicle } from "../models/vehicle";

import { StorageService } from "../services/StorageService";

import * as Google from 'expo-auth-session/providers/google';

// dotenv.config();

export const SignUpScreen= ({ navigation }: NavigationProps) => {
  const [showPasswordErrorText, setPasswordErrorText] = useState(false);
  const [showMissingFieldsErrorText, setMissingFieldsErrorText] = useState(false);
  const [showPasswordIsTooShortErrorText, setPasswordIsTooShortErrorText] = useState(false);
  const [showGoogleErrorText, setShowGoogleErrorText] = useState(false);
  const [showEmailAlreadyUsed, setShowEmailAlreadyUsed] = useState(false);

  const [firstName, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordChecker, setPasswordChecker] = useState<string>("");

  const [post, setPost] = React.useState(null);
  const [accessToken, setAccessToken] = React.useState("");

  const resetErrorMsg =  () => {
    setMissingFieldsErrorText(false);
    setPasswordIsTooShortErrorText(false);
    setPasswordErrorText(false);
    setShowEmailAlreadyUsed(false);
  }

  const onSignUp = async () => {
    let exists = await AuthService.checkEmailIsUsed(email);
    resetErrorMsg();
    if (firstName == "" || lastName == "" || email == "" || password == "" || passwordChecker == ""){
      setMissingFieldsErrorText(true);
    }
    else if (password.length < 8) {
      setPasswordIsTooShortErrorText(true);
    }
    else if (password != passwordChecker) {
      setPasswordErrorText(true);
    }
    /*
    else if (await AuthService.checkEmailIsUsed(email)) {
      setShowEmailAlreadyUsed(true);
    }*/
    else {

      const passenger: Passenger = new Passenger(-1, email, firstName, lastName, "", password, "", "", "EMAIL");
      const driverVehicle:  DriverVehicle = new DriverVehicle(-1, "", "", "", new Vehicle(-1, "", "", ""));
      const driver: Driver = new Driver(-1, email, firstName, lastName, "", password, "", "", "EMAIL", driverVehicle);
      await StorageService.storeData("temp_passenger", JSON.stringify(passenger));
      await StorageService.storeData("temp_driver", JSON.stringify(driver));

      navigation.navigate('RoleSelectionScreen')
    }

  }

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: '268160515802-k4rqi1559edp7d9fbovpe9mhdlmvhpe0.apps.googleusercontent.com',
    expoClientId: '275328991698-4jdkntpb9s4v887v02upijk087a7i3i2.apps.googleusercontent.com',
    androidClientId: '275328991698-1phmpp0dcu2hoipcfujb16ebsum6ord1.apps.googleusercontent.com',
  });

  async function fetchUserInfo(token: string) {
    const _response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });

    return await _response.json();
  }

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;

      if (authentication) {
        setAccessToken(authentication.accessToken)
      };
    }
  }, [response]);

  useEffect(() => {
    if (accessToken) {

      fetchUserInfo(accessToken).then(async userInfo => {
        const passenger: Passenger = new Passenger(-1, userInfo.email, userInfo.given_name, userInfo.family_name, "", userInfo.id, "", "", "GOOGLE");
        const driverVehicle:  DriverVehicle = new DriverVehicle(-1, "", "", "", new Vehicle(-1, "", "", ""));
        const driver: Driver = new Driver(-1, userInfo.email, userInfo.given_name, userInfo.family_name, "", userInfo.id, "", "", "GOOGLE", driverVehicle);


        await StorageService.storeData("temp_passenger", JSON.stringify(passenger));
        await StorageService.storeData("temp_driver", JSON.stringify(driver));
        navigation.navigate('RoleSelectionScreen')
      })

    }
  }, [accessToken]);

  const onSignUpWithGoogle = async () => {
    promptAsync();
  }

  //-------------------------------------------------------------------------------
    return (
      <>
      <View style={styles.container}>
        <Text style={styles.header}>Welcome!</Text>
        <Text style={styles.title}>Sign up for the Fiuumber app</Text>
        <TextInput label="Enter your first name" style={{marginBottom: 20}} onChangeText={(text) => setName(text)}/>
        <TextInput label="Last name" style={{marginBottom: 20}} onChangeText={(text) => setLastName(text)}/>
        <TextInput label="Email" style={{marginBottom: 20}} onChangeText={(text) => setEmail(text)}/>
        <TextInput label="Password" style={{marginBottom: 20}} secureTextEntry={true} onChangeText={(text) => setPassword(text)}/>
        <TextInput label="Confirm Password" style={{marginBottom: 20}} secureTextEntry={true} onChangeText={(text) => setPasswordChecker(text)}/>
        {showMissingFieldsErrorText ? <Text style={styles.error}>Complete missing fields!</Text> : null}
        {showPasswordIsTooShortErrorText ? <Text style={styles.error}>Password should be at least 8 characters long!</Text> : null}
        {showPasswordErrorText ? <Text style={styles.error}>Passwords do not match. Retry!</Text> : null}
        {showEmailAlreadyUsed ? <Text style={styles.error}>Mail is already in use!</Text> : null}

        <Button mode="contained" style={{backgroundColor: Pallete.primaryColor}} onPress={onSignUp}>Next</Button>
        <Button mode="contained"
            icon="google"
            style={{ backgroundColor: Pallete.primaryColor, marginTop: "3%"}}
            disabled={!request}
            onPress={() => { onSignUpWithGoogle();}}>
            Sign up with Google
      </Button>

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
      fontSize: 15,
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
