import React, { FC, ReactElement } from "react";

import { TextInput, Button } from 'react-native-paper';
import { useState } from "react";
import { Pallete } from "../constants/Pallete";
import {  StyleSheet, Text, View} from "react-native";
import { User } from '../models/user';

// import * as dotenv from "dotenv";
import { Passenger } from "../models/passenger";
import { Wallet } from "../models/wallet";
import { StorageService } from "../services/StorageService";

interface UserBasicInfoFormProps {
  user: User | undefined;
}

export const UserBasicInfoForm: FC<UserBasicInfoFormProps> = ({user}: UserBasicInfoFormProps): ReactElement => {
  const [showPasswordErrorText, setPasswordErrorText] = useState(false);
  const [showMissingFieldsErrorText, setMissingFieldsErrorText] = useState(false);
  const [showPasswordIsTooShortErrorText, setPasswordIsTooShortErrorText] = useState(false);

  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [oldPassword, setOldPassword] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordChecker, setPasswordChecker] = useState<string>("");
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [buttonValue, setButtonValue] = useState<string>("Edit");

  const [post, setPost] = React.useState(null);

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

      console.log("Now is no longer editable!")
      setIsEditable(true);
      setButtonValue("Save");
      return
    }

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
      console.log("Now is editable!")
      setIsEditable(false);
      setButtonValue("Edit");
      // navigation.navigate('RoleSelectionScreen')
    }
  }

  // TODO:
  // Validar email con una regex

  return (
    <>
      <TextInput label="First name" style={{marginBottom: 20}} editable={isEditable} value={isEditable ? name : user?.firstName} onChangeText={(text) => setName(text)}/>
      <TextInput label="Last name" style={{marginBottom: 20}} editable={isEditable} value={isEditable ? lastName : user?.lastName}  onChangeText={(text) => setLastName(text)}/>
      <TextInput label="Email or phone number" style={{marginBottom: 20}} editable={isEditable} value={isEditable ? email : user?.email}  onChangeText={(text) => setEmail(text)}/>
      {!isEditable &&
      <TextInput label="Password" style={{marginBottom: 20}} secureTextEntry={true} editable={isEditable} value={"default"} onChangeText={(text) => setPassword(text)}/>
      }
     {isEditable &&
      <TextInput label="Old Password" style={{marginBottom: 20}} secureTextEntry={true} editable={isEditable} onChangeText={(text) => setOldPassword(text)}/>
     }
           {isEditable &&
      <TextInput label="New Password" style={{marginBottom: 20}} secureTextEntry={true} editable={isEditable} onChangeText={(text) => setPassword(text)}/>
     }
     {isEditable &&
      <TextInput label="Confirm Password" style={{marginBottom: 20}} secureTextEntry={true} editable={isEditable} onChangeText={(text) => setPasswordChecker(text)}/>
     }

      {showMissingFieldsErrorText ? <Text style={styles.error}>Complete missing fields!</Text> : null}
      {showPasswordIsTooShortErrorText ? <Text style={styles.error}>Password should be at least 8 characters long!</Text> : null}
      {showPasswordErrorText ? <Text style={styles.error}>Passwords do not match. Retry!</Text> : null}
      <Button mode="contained" style={{backgroundColor: Pallete.primaryColor}} onPress={onPressButton}>{buttonValue}</Button>
    </>
  )
};

export default UserBasicInfoForm;

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


