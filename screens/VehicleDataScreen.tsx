import React from "react";
import { useState } from "react";
import { StyleSheet,Pressable } from "react-native";
import VehicleDataForm from "../components/VehicleDataForm";
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

  const [domain, setDomain] = useState<string>("");
  const [brandAndModel, setBrandAndModel] = useState<string>("");
  const [license, setLicense] = useState<string>("");

  const { vehicleData } = React.useContext(AuthContext);

  const onPressNextButton = async () => {
    if (domain == "" || brandAndModel == "" || license == ""){
      setMissingFieldsErrorText(true);
    }
    else {
      setMissingFieldsErrorText(false);
      const strDriver: string | null = await StorageService.getData("temp_user");
      if (!strDriver) return;
      const driver: Driver = JSON.parse(strDriver);
      const vehicle = new Vehicle(-1, "Toyota", "Ethos", "link")
      const driverVehicle = new DriverVehicle(
        -1,
        domain,
        brandAndModel,
        license,
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
        <TextInput label="Domain" style={{marginBottom: 20}} onChangeText={(text) => setDomain(text)}/>
        <TextInput label="Brand and Model" style={{marginBottom: 20}} onChangeText={(text) => setBrandAndModel(text)}/>
        <TextInput label="License (file)" style={{marginBottom: 20}} onChangeText={(text) => setLicense(text)}/>
        {showMissingFieldsErrorText ? <Text style={styles.error}>Complete missing fields!</Text> : null}
        <Pressable style={{...styles.button, ...styles.bgSignUp, ...{marginBottom: 20}}} onPress={() => onPressNextButton()}>
          <Text style={{...styles.buttonText, ...styles.colorSignUp}}>Next</Text>
        </Pressable>
      </View>
      </>
    );
  }


