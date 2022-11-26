import React, { FC, ReactElement } from "react";

import { TextInput, Button } from 'react-native-paper';
import { useState, useEffect} from "react";
import { Pallete } from "../constants/Pallete";
import {  StyleSheet, Text, View} from "react-native";
import { User } from '../models/user';

// import * as dotenv from "dotenv";
import { Passenger } from "../models/passenger";
import { Wallet } from "../models/wallet";
import { AuthService } from "../services/AuthService";

interface PassengerPublicProfileFormProps {
}

export const PassengerPublicProfileForm: FC<PassengerPublicProfileFormProps> = (): ReactElement => {
  let user = AuthService.getCurrentUserToken()?.user;

  const [firstName, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [calification, setCalification] = useState<string>("");
  const [created_at, setCreatedAt] = useState<string>("");
  const [trips, setTrips] = useState<string>("");



  useEffect(() => {
    AuthService.getCurrentDriver().then((passenger: Passenger | undefined) => {
      if (passenger != undefined) {
        // passenger values states
        const _userId = user?.id
        setName(passenger.firstName)
        setLastName(passenger.lastName)
        setCalification(passenger.calification)
        setCreatedAt(passenger.createdAt)
        setTrips(passenger.trips)

      }
    }).catch((error) => {
      console.log(error);
    });

  }, [ ]);


  return (
    <>
      <Text style={styles.subtitle}>Passenger Information</Text>

      <TextInput label="First name" style={{marginBottom: 20}} editable={false}
        value={ firstName }
      />

      <TextInput label="Last name" style={{marginBottom: 20}} editable={false}
        value={lastName }
      />


      <TextInput label="Calification" style={{marginBottom: 20}} editable={false}
        value={ calification}
      />

      <TextInput label="In the app since" style={{marginBottom: 20}} editable={false}
        value={ created_at}
      />

      <TextInput label="Trips made" style={{marginBottom: 20}} editable={false}
        value={ trips}
      />

    </>
  )
};

export default PassengerPublicProfileForm;

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
  subtitle: {
    fontSize: 25,
    color: Pallete.greenBackground,
    textAlign: "left",
    margin:'3%',
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


