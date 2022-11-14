import React, { FC, ReactElement } from "react";

import { TextInput, Button } from 'react-native-paper';
import { useState } from "react";
import { Pallete } from "../constants/Pallete";
import {  StyleSheet, Text, View} from "react-native";
import { User } from '../models/user';

// import * as dotenv from "dotenv";
import { Passenger } from "../models/passenger";
import { Wallet } from "../models/wallet";
import { AuthService } from "../services/AuthService";

interface PassengerProfileFormProps {
}

export const PassengerProfileForm: FC<PassengerProfileFormProps> = (): ReactElement => {
  let user = AuthService.getCurrentUserToken()?.user;

  // const [showPasswordErrorText, setPasswordErrorText] = useState(false);
  // const [showMissingFieldsErrorText, setMissingFieldsErrorText] = useState(false);
  // const [showPasswordIsTooShortErrorText, setPasswordIsTooShortErrorText] = useState(false);

  // const [firstName, setName] = useState<string>("");
  // const [lastName, setLastName] = useState<string>("");
  // const [email, setEmail] = useState<string>("");
  // const [address, setAddress] = useState<string>("");

  // const [oldPassword, setOldPassword] = useState<string>(""); // Verify
  // const [password, setPassword] = useState<string>("");
  // const [passwordChecker, setPasswordChecker] = useState<string>("");
  // const [isEditable, setIsEditable] = useState<boolean>(false);
  // const [changePassword, setChangePassword] = useState<boolean>(false);

  // const [buttonValue, setButtonValue] = useState<string>("Edit");
  // const [changePasswordButtonValue, setChangePasswordButtonValue] = useState<string>("Change password");

  // const [post, setPost] = React.useState(null);

  // const onPressChangePasswordButton = async () => {
  //   if (!changePassword) {
  //     setIsEditable(true);
  //     setChangePassword(true);
  //     setButtonValue("Save");
  //     setChangePasswordButtonValue("Go back");
  //   } else {
  //     setChangePassword(false);
  //     setChangePasswordButtonValue("Change password");
  //     setIsEditable(false);
  //     setButtonValue("Edit");
  //   }
  // }

  // const onPressButton = async () => {
  //   if (!isEditable) {
  //     const firstName = user?.firstName
  //     if (firstName != undefined) {
  //       setName(firstName)
  //     }
  //     const lastName = user?.lastName
  //     if (lastName != undefined) {
  //       setLastName(lastName)
  //     }
  //     const email = user?.email
  //     if (email != undefined) {
  //       setEmail(email)
  //     }
  //     const address = user?.address
  //     if (address != undefined) {
  //       setAddress(address)
  //     }

  //     setIsEditable(true);
  //     setButtonValue("Save");
  //     setChangePassword(false);
  //     return
  //   }

  //   if (firstName == "" || lastName == "" || email == "" || password == "" || address == ""){
  //     setMissingFieldsErrorText(true);
  //   }
  //   else if (password.length < 8) {
  //     setMissingFieldsErrorText(false);
  //     setPasswordIsTooShortErrorText(true);
  //   }
  //   else if (changePassword && (password != passwordChecker)) {
  //     setMissingFieldsErrorText(false);
  //     setPasswordIsTooShortErrorText(false);
  //     setPasswordErrorText(true);
  //   }
  //   else {
  //     setMissingFieldsErrorText(false);
  //     setPasswordIsTooShortErrorText(false);
  //     setPasswordErrorText(false);
  //     const _userId = user?.id

  //     if (_userId) {
  //       const passenger: Passenger = new Passenger(_userId, email, firstName, lastName, address, password, "username", new Wallet("", "address", "password"));
  //       await AuthService.updatePassenger(passenger);
  //       setPassword("")
  //       user = AuthService.getCurrentUserToken()?.user;
  //     }

  //   }
  //     setChangePassword(false);
  //     setChangePasswordButtonValue("Change password");
  //     setIsEditable(false);
  //     setButtonValue("Edit");
  //     // navigation.navigate('RoleSelectionScreen')

  // }

 

  return (
    <>
      <Text style={styles.subtitle}>¿Qué te pareció tu Chofer? Compartí tu opinion asi nos ayudas a mejorar! </Text>

     <TextInput label="Dejanos tu opinion" style={{marginBottom: 20}} />

      {/* <TextInput label="Last name" style={{marginBottom: 20}} editable={isEditable}
        value={isEditable ? lastName : user?.lastName}
        onChangeText={(text) => setLastName(text)}
      />

      <TextInput label="Email or phone number" style={{marginBottom: 20}} editable={isEditable}
        value={isEditable ? email : user?.email}
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput label="Address" style={{marginBottom: 20}} editable={isEditable}
        value={isEditable ? address : user?.address}
        onChangeText={(text) => setAddress(text)}
      />

      { (!changePassword) &&
      <TextInput label="Password" style={{marginBottom: 20}} secureTextEntry={true} editable={isEditable} value={isEditable ? password : ""} onChangeText={(text) => setPassword(text)}/>
      }

      {(isEditable && changePassword) &&
        <TextInput label="Old Password" style={{marginBottom: 20}} secureTextEntry={true} editable={isEditable} onChangeText={(text) => setOldPassword(text)}/>
      }

     {(isEditable && changePassword) &&
      <TextInput label="New Password" style={{marginBottom: 20}} secureTextEntry={true} editable={isEditable} onChangeText={(text) => setPassword(text)}/>
     }

     {(isEditable && changePassword) &&
      <TextInput label="Confirm Password" style={{marginBottom: 20}} secureTextEntry={true} editable={isEditable} onChangeText={(text) => setPasswordChecker(text)}/>
     }

    {showMissingFieldsErrorText ? <Text style={styles.error}>Complete missing fields!</Text> : null}
    {showPasswordIsTooShortErrorText ? <Text style={styles.error}>Password should be at least 8 characters long!</Text> : null}
    {showPasswordErrorText ? <Text style={styles.error}>Passwords do not match. Retry!</Text> : null}
    <Button mode="contained" style={{backgroundColor: Pallete.primaryColor, margin: "2%"}} onPress={onPressButton}>{buttonValue}</Button>
    <Button mode="contained" style={{backgroundColor: Pallete.primaryColor, margin: "2%"}} onPress={onPressChangePasswordButton}>{changePasswordButtonValue}</Button> */}

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
    color: Pallete.darkColor,
    textAlign: "center",
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


