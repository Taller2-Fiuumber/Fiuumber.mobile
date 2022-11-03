import React, { FC, ReactElement } from "react";

import { TextInput, Button } from 'react-native-paper';
import { useState } from "react";
import { Pallete } from "../constants/Pallete";
import {  StyleSheet, Text, View} from "react-native";
import { User } from '../models/user';

// import * as dotenv from "dotenv";
import { Driver } from "../models/driver";
import { Wallet } from "../models/wallet";
import { AuthService } from "../services/AuthService";

interface DriverProfileFormProps {
}

export const DriverProfileForm: FC<DriverProfileFormProps> = (): ReactElement => {
  let user = AuthService.getCurrentUserToken()?.user;

  const [showPasswordErrorText, setPasswordErrorText] = useState(false);
  const [showMissingFieldsErrorText, setMissingFieldsErrorText] = useState(false);
  const [showPasswordIsTooShortErrorText, setPasswordIsTooShortErrorText] = useState(false);

  const [firstName, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [oldPassword, setOldPassword] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordChecker, setPasswordChecker] = useState<string>("");
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [changePassword, setChangePassword] = useState<boolean>(false);

  const [buttonValue, setButtonValue] = useState<string>("Edit");
  const [changePasswordButtonValue, setChangePasswordButtonValue] = useState<string>("Change password");

  const [post, setPost] = React.useState(null);

  const onPressChangePasswordButton = async () => {
    if (!passwordChecker) {
      setIsEditable(true);
      setChangePassword(true);
      setButtonValue("Save");
      setChangePasswordButtonValue("Go back");
    } else {
      setChangePassword(false);
      setChangePasswordButtonValue("Change password");
      setIsEditable(false);
      setButtonValue("Edit");
    }
  }

  const onPressButton = async () => {
    if (!isEditable) {
      const firstName = user?.firstName
      if (firstName != undefined) {
        setName(firstName)
      }
      const lastName = user?.lastName
      if (lastName != undefined) {
        setLastName(lastName)
      }
      const email = user?.email
      if (email != undefined) {
        setEmail(email)
      }

      setIsEditable(true);
      setButtonValue("Save");
      return
    }

    if (firstName == "" || lastName == "" || email == "" || password == ""){
      setMissingFieldsErrorText(true);
    }
    else if (password.length < 8) {
      setMissingFieldsErrorText(false);
      setPasswordIsTooShortErrorText(true);
    }
    /*
    else if (password != passwordChecker) {
      setMissingFieldsErrorText(false);
      setPasswordIsTooShortErrorText(false);
      setPasswordErrorText(true);
    }*/
    else {
      setMissingFieldsErrorText(false);
      setPasswordIsTooShortErrorText(false);
      setPasswordErrorText(false);
      const _userId = user?.id


      if (_userId) {
        const driver: Driver = new Driver(_userId, email, firstName, lastName, "address", password, "username", new Wallet("", "address", "password"));
        await AuthService.updateDriver(driver);
        setPassword("")
        user = AuthService.getCurrentUserToken()?.user;
      }

    }

      setIsEditable(false);
      setButtonValue("Edit");
      // navigation.navigate('RoleSelectionScreen')

  }

  // TODO:
  // Validar email con una regex
  // PErmitir cambiar contraseña

  return (
    <>
      <Text style={styles.subtitle}>Personal information</Text>

      <TextInput label="First first name" style={{marginBottom: 20}} editable={isEditable} value={isEditable ? firstName : user?.firstName} onChangeText={(text) => setName(text)}/>
      <TextInput label="Last name" style={{marginBottom: 20}} editable={isEditable} value={isEditable ? lastName : user?.lastName}  onChangeText={(text) => setLastName(text)}/>
      <TextInput label="Email or phone number" style={{marginBottom: 20}} editable={isEditable} value={isEditable ? email : user?.email}  onChangeText={(text) => setEmail(text)}/>
      {!changePassword &&
      <TextInput label="Password" style={{marginBottom: 20}} secureTextEntry={true} editable={isEditable} value={isEditable ? password : ""} onChangeText={(text) => setPassword(text)}/>
      }

     {(isEditable && changePassword) &&
      <TextInput label="Old Password" style={{marginBottom: 20}} secureTextEntry={true} editable={isEditable} onChangeText={(text) => setPassword(text)}/>
     }

    {(isEditable && changePassword) &&
      <TextInput label="New Password" style={{marginBottom: 20}} secureTextEntry={true} editable={isEditable} onChangeText={(text) => setPassword(text)}/>
     }
     {(isEditable && changePassword) &&
      <TextInput label="Confirm Password" style={{marginBottom: 20}} secureTextEntry={true} editable={isEditable} onChangeText={(text) => setPasswordChecker(text)}/>
     }


    <Text style={styles.subtitle}>Car information</Text>



      {showMissingFieldsErrorText ? <Text style={styles.error}>Complete missing fields!</Text> : null}
      {showPasswordIsTooShortErrorText ? <Text style={styles.error}>Password should be at least 8 characters long!</Text> : null}
      {showPasswordErrorText ? <Text style={styles.error}>Passwords do not match. Retry!</Text> : null}
      <Button mode="contained" style={{backgroundColor: Pallete.primaryColor, margin: "2%"}} onPress={onPressButton}>{buttonValue}</Button>
      <Button mode="contained" style={{backgroundColor: Pallete.primaryColor, margin: "2%"}} onPress={onPressChangePasswordButton}>{changePasswordButtonValue}</Button>

    </>
  )
};

export default DriverProfileForm;

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


