import React, { FC, ReactElement } from "react";

import { TextInput, Button } from 'react-native-paper';
import { useState, useEffect } from "react";
import { Pallete } from "../constants/Pallete";
import {  StyleSheet, Text, View} from "react-native";
import { Driver } from "../models/driver";
import { AuthService } from "../services/AuthService";

interface DriverProfileFormProps {
}

export const DriverProfileForm: FC<DriverProfileFormProps> = (): ReactElement => {

    /*------------------------States Initialization----------------------------*/
    // Validations states
    const [showMissingFieldsErrorText, setMissingFieldsErrorText] = useState(false);

    // User states
    const [currentDriver, setCurrentDriver] = useState<Driver | undefined>(undefined);

    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [address, setAddress] = useState<string>("");

    const [editableFirstName, setEditableFirstName] = useState<string>("");
    const [editableLastName, setEditableLastName] = useState<string>("");
    const [editableEmail, setEditableEmail] = useState<string>("");
    const [editableAddress, setEditableAddress] = useState<string>("");

    // DriverVehicle states
    const [domain, setDomain] = useState<string>("");
    const [modelYear, setModelYear] = useState<string>("");
    const [colorName, setColorName] = useState<string>("");

    const [editableDomain, setEditableDomain] = useState<string>("");
    const [editableModelYear, setEditableModelYear] = useState<string>("");
    const [editableColorName, setEditableColorName] = useState<string>("");

    // DriverVehicle states
    const [brand, setBrand] = useState<string>("");
    const [model, setModel] = useState<string>("");
    const [image, setImage] = useState<string>("");

    const [editableBrand, setEditableBrand] = useState<string>("");
    const [editableModel, setEditableModel] = useState<string>("");
    const [editableImage, setEditableImage] = useState<string>("");

    // Button behavior label states
    const [isEditable, setIsEditable] = useState<boolean>(false);

    // Button value label states
    const [buttonValue, setButtonValue] = useState<string>("Edit");

  /*--------------------------Getting driver data------------------------------*/

  useEffect(() => {
    AuthService.getCurrentDriver().then((driver: Driver | undefined) => {
      if (driver != undefined) {
        setCurrentDriver(driver);

        // User values states
        setFirstName(driver.firstName)
        setLastName(driver.lastName)
        setEmail(driver.email)
        setAddress(driver.address)

        // Wallet id

        // Car values states
        setBrand(driver.vehicle.vehicle.brand)
        setModel(driver.vehicle.vehicle.model)
        setImage(driver.vehicle.vehicle.image)
        setDomain(driver.vehicle.domain)
        setModelYear(driver.vehicle.modelYear)
        setColorName(driver.vehicle.colorName)
      }
    }).catch((error) => {
      console.log(error);
    });

  }, [
    isEditable,
  ]);

  const onPressButton = async () => {
    if (!isEditable) {
      // User values states
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
      return
    }

    if (firstName == "" || lastName == "" || email == ""){
      setMissingFieldsErrorText(true);
    }
    else {

      if (currentDriver) {
        currentDriver.vehicle.domain = editableDomain;
        currentDriver.vehicle.modelYear = editableModelYear;
        currentDriver.vehicle.colorName = editableColorName;

        currentDriver.vehicle.vehicle.brand = editableBrand;
        currentDriver.vehicle.vehicle.model = editableModel;
        currentDriver.vehicle.vehicle.image = editableModel;

        currentDriver.email = editableEmail;
        currentDriver.firstName = editableFirstName;
        currentDriver.lastName = editableLastName;
        currentDriver.address = editableAddress;

        await AuthService.updateDriver(currentDriver);
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

      <Button mode="contained" style={{backgroundColor: Pallete.primaryColor, margin: "2%"}}
        onPress={onPressButton}>{buttonValue}
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


