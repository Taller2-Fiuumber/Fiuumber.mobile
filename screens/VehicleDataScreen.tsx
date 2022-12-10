import React from "react";
import { useState } from "react";
import { StyleSheet,Pressable } from "react-native";
import { Text, View } from "../components/Themed";
import { Pallete } from "../constants/Pallete";
import AuthContext from "../contexts/AuthContext";
import { NavigationProps } from "../types";
import { TextInput, Button } from 'react-native-paper';
import { Driver } from "../models/driver";
import { AuthService } from "../services/AuthService";
import { StorageService } from "../services/StorageService";
import { DriverVehicle } from "../models/driver_vehicle";
import { Vehicle } from "../models/vehicle";

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
      fontSize: 35,
      fontWeight: 'bold',
      color: Pallete.whiteColor,
      margin: 0
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
    bgSignUp: {
      backgroundColor: Pallete.primaryColor,
    },
    colorSignUp: {
      color: Pallete.lightColor,
    },
    error: {
      color: '#FF0000',
      marginBottom: 10,
      textAlign: 'center',
      justifyContent: 'center',
      fontSize: 15,
    },
});
export const VehicleDataScreen = ({ navigation }: NavigationProps) => {
  const [showMissingFieldsErrorText, setMissingFieldsErrorText] = useState(false);

  const [brand, setBrand] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [domain, setDomain] = useState<string>("");
  const [modelYear, setModelYear] = useState<string>("");
  const [colorName, setColorName] = useState<string>("");

  const { vehicleData } = React.useContext(AuthContext);

  const onPressNextButton = async () => {
    if (brand == "" || model == "" || domain == ""){
      setMissingFieldsErrorText(true);
    }
    else {
      setMissingFieldsErrorText(false);
      const strDriver: string | null = await StorageService.getData("temp_driver");
      if (!strDriver) return;
      const driver: Driver= JSON.parse(strDriver);
      const vehicle = new Vehicle(-1, brand, model, image)
      const driverVehicle = new DriverVehicle(
        -1,
        domain,
        modelYear,
        colorName,
        vehicle
      )
      driver.vehicle = driverVehicle;

      await AuthService.registerDriver(driver);
      navigation.navigate('SignUpSuccessfullyScreen');
    }
  }

    return (
      <>
      <View style={styles.container}>
      <Text style={styles.header}>Vehicle Data</Text>
      <TextInput label="Brand" style={{marginBottom: 20}} onChangeText={(text) => setBrand(text)}/>
      <TextInput label="Model" style={{marginBottom: 20}} onChangeText={(text) => setModel(text)}/>
      <TextInput label="Image" style={{marginBottom: 20}} onChangeText={(text) => setImage(text)}/>
      <TextInput label="Domain" style={{marginBottom: 20}} onChangeText={(text) => setDomain(text)}/>
      <TextInput label="Model year" style={{marginBottom: 20}} onChangeText={(text) => setModelYear(text)}/>
      <TextInput label="Color" style={{marginBottom: 20}} onChangeText={(text) => setColorName(text)}/>
        {showMissingFieldsErrorText ? <Text style={styles.error}>Complete missing fields!</Text> : null}
        <Pressable style={{...styles.button, ...styles.bgSignUp, ...{marginBottom: 20}}} onPress={() => onPressNextButton()}>
          <Text style={{...styles.buttonText, ...styles.colorSignUp}}>Next</Text>
        </Pressable>
      </View>
      </>
    );
  }


