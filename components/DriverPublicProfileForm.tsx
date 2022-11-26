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

interface DriverPublicProfileFormProps {
}



export const DriverPublicProfileForm: FC<DriverPublicProfileFormProps> = (): ReactElement => {

    /*------------------------States Initialization----------------------------*/

    // User states
    const [userId, setUserId] = useState<number>(-1);
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [calification, setCalification] = useState<string>("");
    const [created_at, setCreatedAt] = useState<string>("");
    const [trips, setTrips] = useState<string>("");


    // DriverVehicle states
    const [driverVehicleId, setDriverVehicleId] = useState<number>(-1);
    const [domain, setDomain] = useState<string>("");
    const [modelYear, setModelYear] = useState<string>("");
    const [colorName, setColorName] = useState<string>("");

    // DriverVehicle states
    const [vehicleId, setVehicleId] = useState<number>(-1);
    const [brand, setBrand] = useState<string>("");
    const [model, setModel] = useState<string>("");
    const [image, setImage] = useState<string>("");

  /*--------------------------Getting driver data------------------------------*/

  useEffect(() => {
    AuthService.getCurrentDriver().then((driver: Driver | undefined) => {
      if (driver != undefined) {
        // User values states
        setUserId(driver.user.id)
        setFirstName(driver.user.firstName)
        setLastName(driver.user.lastName)
        setCalification(driver.user.calification)
        setCreatedAt(driver.user.createdAt)
        setTrips(driver.user.trips)


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

  }, [ ]);

  return (
    <>
      <Text style={styles.subtitle}>Driver Information</Text>

      <TextInput label="First name" style={{marginBottom: 20}} editable={false}
        value={firstName}
      />

      <TextInput label="Last name" style={{marginBottom: 20}} editable={false}
        value={lastName}
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
  
      <Text style={styles.subtitle}>Car Information</Text>

      <TextInput label="Domain" style={{marginBottom: 20}} editable={false}
        value={ domain}
      />

      <TextInput label="Model year" style={{marginBottom: 20}} editable={false}
        value={ modelYear}
        
      />

      <TextInput label="Color" style={{marginBottom: 20}} editable={false}
        value={  colorName}
      />

      <TextInput label="Brand" style={{marginBottom: 20}} editable={false}
        value={ brand}
      />


    </>
  )
};

export default DriverPublicProfileForm;

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


