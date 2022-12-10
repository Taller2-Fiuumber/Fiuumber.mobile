import React, { FC, ReactElement } from "react";

import { TextInput, Button } from 'react-native-paper';
import { useState, useEffect } from "react";
import { Pallete } from "../constants/Pallete";
import {  StyleSheet, Text, View} from "react-native";
import { User } from '../models/user';
// import * as dotenv from "dotenv";
import { UserData } from "../models/user_data";
import { Driver } from "../models/driver";
import { Wallet } from "../models/wallet";
import { DriverVehicle } from "../models/driver_vehicle";
import { Vehicle } from "../models/vehicle";

import { AuthService } from "../services/AuthService";

interface DriverProfileFormProps {
}



export const DriverProfileForm: FC<DriverProfileFormProps> = (): ReactElement => {

    /*------------------------States Initialization----------------------------*/
    // Validations states
    const [showPasswordErrorText, setPasswordErrorText] = useState(false);
    const [showMissingFieldsErrorText, setMissingFieldsErrorText] = useState(false);
    const [showPasswordIsTooShortErrorText, setPasswordIsTooShortErrorText] = useState(false);

    // User states
    const [userId, setUserId] = useState<number>(-1);
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [address, setAddress] = useState<string>("");

    const [editableUserId, setEditableUserId] = useState<number>(-1);
    const [editableFirstName, setEditableFirstName] = useState<string>("");
    const [editableLastName, setEditableLastName] = useState<string>("");
    const [editableEmail, setEditableEmail] = useState<string>("");
    const [editableAddress, setEditableAddress] = useState<string>("");

    // User password states
    const [password, setPassword] = useState<string>("");
    const [oldPassword, setOldPassword] = useState<string>(""); // Verify
    const [passwordChecker, setPasswordChecker] = useState<string>("");

    // Wallet states
    const [walletId, setWalletId] = useState<number>(-1);

    // DriverVehicle states
    const [driverVehicleId, setDriverVehicleId] = useState<number>(-1);
    const [domain, setDomain] = useState<string>("");
    const [modelYear, setModelYear] = useState<string>("");
    const [colorName, setColorName] = useState<string>("");

    const [editableDriverVehicleId, setEditableDriverVehicleId] = useState<number>(-1);
    const [editableDomain, setEditableDomain] = useState<string>("");
    const [editableModelYear, setEditableModelYear] = useState<string>("");
    const [editableColorName, setEditableColorName] = useState<string>("");

    // DriverVehicle states
    const [vehicleId, setVehicleId] = useState<number>(-1);
    const [brand, setBrand] = useState<string>("");
    const [model, setModel] = useState<string>("");
    const [image, setImage] = useState<string>("");

    const [editableBrand, setEditableBrand] = useState<string>("");
    const [editableModel, setEditableModel] = useState<string>("");
    const [editableImage, setEditableImage] = useState<string>("");

    // Button behavior label states
    const [isEditable, setIsEditable] = useState<boolean>(false);
    const [changePassword, setChangePassword] = useState<boolean>(false);

    // Button value label states
    const [buttonValue, setButtonValue] = useState<string>("Edit");
    const [changePasswordButtonValue, setChangePasswordButtonValue] = useState<string>("Change password");

  /*--------------------------Getting driver data------------------------------*/

  useEffect(() => {
    AuthService.getCurrentDriver().then((driver: Driver | undefined) => {
      if (driver != undefined) {
        // User values states
        setUserId(driver.user.id)
        setFirstName(driver.user.firstName)
        setLastName(driver.user.lastName)
        setEmail(driver.user.email)
        setAddress(driver.user.address)

        // Wallet id
        setWalletId(driver.wallet.id)

        // Car values states
        setDriverVehicleId(driver.driverVehicle.id)
        setVehicleId(driver.driverVehicle.vehicle.id)
        setBrand(driver.driverVehicle.vehicle.brand)
        setModel(driver.driverVehicle.vehicle.model)
        setImage(driver.driverVehicle.vehicle.image)
        setDomain(driver.driverVehicle.domain)
        setModelYear(driver.driverVehicle.modelYear)
        setColorName(driver.driverVehicle.colorName)
      }
    }).catch((error) => {
      console.log(error);
    });

  }, [
    isEditable,
  ]);

  const onPressChangePasswordButton = async () => {
    if (!changePassword) {
      // Change buttons
      setIsEditable(true);
      setChangePassword(true);
      setButtonValue("Save");
      setChangePasswordButtonValue("Go back");
    } else {
      // Change buttons
      setIsEditable(false);
      setChangePassword(false);
      setButtonValue("Edit");
      setChangePasswordButtonValue("Change password");
    }
  }

  const onPressButton = async () => {
    if (!isEditable) {
      // User values states
      setEditableUserId(userId)
      setEditableFirstName(firstName)
      setEditableLastName(lastName)
      setEditableEmail(email)
      setEditableAddress(address)

      // Car values states
      setEditableBrand(brand)
      setEditableModel(model)
      setEditableImage(image)
      setEditableDomain(domain)
      setEditableModelYear(modelYear)
      setEditableColorName(colorName)

      // Change buttons
      setIsEditable(true);
      setButtonValue("Save");
      setChangePassword(false);
      return
    }

    if (firstName == "" || lastName == "" || email == "" || password == ""){
      setMissingFieldsErrorText(true);
    }
    else if (password.length < 8) {
      setMissingFieldsErrorText(false);
      setPasswordIsTooShortErrorText(true);
    }
    else if (changePassword && (password != passwordChecker)) {
      setMissingFieldsErrorText(false);
      setPasswordIsTooShortErrorText(false);
      setPasswordErrorText(true);
    }
    else {
      setMissingFieldsErrorText(false);
      setPasswordIsTooShortErrorText(false);
      setPasswordErrorText(false);

      if (userId) {
        const userData = new UserData(userId, editableEmail, editableFirstName, editableLastName, editableAddress, password, "username")
        const wallet = new Wallet(walletId, "address", "password")
        const driverVehicle = new DriverVehicle(
          driverVehicleId,
          editableDomain,
          editableModelYear,
          editableColorName,
          new Vehicle(vehicleId, editableBrand, editableModel, editableImage),
        )
        const driver: Driver = new Driver(userData, wallet, driverVehicle);
        await AuthService.updateDriver(driver);
        setPassword("")
      }

    }

    setIsEditable(false);
    setButtonValue("Edit");
    setChangePassword(false);
    setChangePasswordButtonValue("Change password");
    // navigation.navigate('RoleSelectionScreen')

  }

  // TODO:
  // Validar email con una regex
  // PErmitir cambiar contraseña

  return (
    <>
      <Text style={styles.subtitle}>Personal information</Text>

      <TextInput label="First first name" style={{marginBottom: 20}} editable={isEditable}
        value={isEditable ? editableFirstName : firstName}
        onChangeText={(text) => isEditable ? setEditableFirstName(text) : setFirstName(text)}
      />

      <TextInput label="Last name" style={{marginBottom: 20}} editable={isEditable}
        value={isEditable ? editableLastName : lastName}
        onChangeText={(text) => isEditable ? setEditableLastName(text) : setLastName(text)}
      />

      <TextInput label="Email" style={{marginBottom: 20}} editable={isEditable}
        value={isEditable ? editableEmail : email}
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput label="Address" style={{marginBottom: 20}} editable={isEditable}
        value={isEditable ? editableAddress : address}
        onChangeText={(text) => isEditable ? setEditableAddress(text) : setAddress(text)}
      />

      {!changePassword &&
        <TextInput label="Password" style={{marginBottom: 20}} secureTextEntry={true} editable={isEditable}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
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

      <Text style={styles.subtitle}>Car information</Text>

      <TextInput label="Domain" style={{marginBottom: 20}} editable={isEditable}
        value={isEditable ? editableDomain : domain}
        onChangeText={(text) => isEditable ? setEditableDomain(text) : setDomain(text)}
      />

      <TextInput label="Model year" style={{marginBottom: 20}} editable={isEditable}
        value={isEditable ? editableModelYear : modelYear}
        onChangeText={(text) => isEditable ? setEditableModelYear(text) : setModelYear(text)}
      />

      <TextInput label="Color" style={{marginBottom: 20}} editable={isEditable}
        value={isEditable ? editableColorName : colorName}
        onChangeText={(text) => isEditable ? setEditableColorName(text) : setColorName(text)}
      />

      <TextInput label="Brand" style={{marginBottom: 20}} editable={isEditable}
        value={isEditable ? editableBrand : brand}
        onChangeText={(text) => isEditable ? setEditableBrand(text) : setBrand(text)}
      />

      <TextInput label="Image url" style={{marginBottom: 20}} editable={isEditable}
        value={isEditable ? editableImage : image}
        onChangeText={(text) => isEditable ? setEditableImage(text) : setImage(text)}
      />


      {showMissingFieldsErrorText ? <Text style={styles.error}>Complete missing fields!</Text> : null}
      {showPasswordIsTooShortErrorText ? <Text style={styles.error}>Password should be at least 8 characters long!</Text> : null}
      {showPasswordErrorText ? <Text style={styles.error}>Passwords do not match. Retry!</Text> : null}

      <Button mode="contained" style={{backgroundColor: Pallete.primaryColor, margin: "2%"}}
        onPress={onPressButton}>{buttonValue}
      </Button>

      <Button mode="contained" style={{backgroundColor: Pallete.primaryColor, margin: "2%"}}
        onPress={onPressChangePasswordButton}>{changePasswordButtonValue}
      </Button>

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


