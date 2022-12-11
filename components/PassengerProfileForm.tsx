import React, { FC, ReactElement, useEffect } from "react";

import { TextInput, Button } from 'react-native-paper';
import { useState } from "react";
import { Pallete } from "../constants/Pallete";
import {  StyleSheet, Text, View} from "react-native";
import { User } from '../models/user';

// import * as dotenv from "dotenv";
import { Passenger } from "../models/passenger";
import { AuthService } from "../services/AuthService";

interface PassengerProfileFormProps {
}

export const PassengerProfileForm: FC<PassengerProfileFormProps> = (): ReactElement => {

  const [showMissingFieldsErrorText, setMissingFieldsErrorText] = useState(false);

  const [passenger, setPassenger] = useState<Passenger | undefined>(undefined);

  const [firstName, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const [isEditable, setIsEditable] = useState<boolean>(false);

  const [buttonValue, setButtonValue] = useState<string>("Edit");

  useEffect(() => {
    AuthService.getCurrentPassenger().then(p => {
      if (p) {
        setPassenger(p);
        setName(p.firstName);
        setLastName(p.lastName);
        setEmail(p.email);
        setAddress(p.address);
      }

    })
  }, [])


  const onPressButton = async () => {
    if (!isEditable && passenger) {
      setName(firstName)
      setLastName(lastName)
      setEmail(email)
      setAddress(address)

      setIsEditable(true);
      setButtonValue("Save");
      return
    }

    if (firstName == "" || lastName == "" || email == "" || address == ""){
      setMissingFieldsErrorText(true);
    }
    else {
      setMissingFieldsErrorText(false);

      if (passenger) {
        const update_passenger: Passenger = new Passenger(passenger.id, email, firstName, lastName, address, passenger.password, passenger.username, passenger.walletPrivateKey, passenger.accountType);
        await AuthService.updatePassenger(update_passenger);
        AuthService.getCurrentPassenger().then(p => {
          if (p) {
            setPassenger(p);
            setName(p.firstName);
            setLastName(p.lastName);
            setEmail(p.email);
            setAddress(p.address);
          }
        });
      }

      setIsEditable(false);
      setButtonValue("Edit");
    }
  }

  return (
    <>
      <Text style={styles.subtitle}>Personal information</Text>

      <TextInput label="First first name" style={{marginBottom: 20}} editable={isEditable}
        value={isEditable ? firstName : passenger?.firstName}
        onChangeText={(text) => setName(text)}
      />

      <TextInput label="Last name" style={{marginBottom: 20}} editable={isEditable}
        value={isEditable ? lastName : passenger?.lastName}
        onChangeText={(text) => setLastName(text)}
      />

      <TextInput label="Email" style={{marginBottom: 20}} editable={isEditable}
        value={isEditable ? email : passenger?.email}
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput label="Address" style={{marginBottom: 20}} editable={isEditable}
        value={isEditable ? address : passenger?.address}
        onChangeText={(text) => setAddress(text)}
      />

    {showMissingFieldsErrorText ? <Text style={styles.error}>Complete missing fields!</Text> : null}
    <Button mode="contained" style={{backgroundColor: Pallete.primaryColor, margin: "2%"}} onPress={onPressButton}>{buttonValue}</Button>

    </>
  )
};

export default PassengerProfileForm;

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


