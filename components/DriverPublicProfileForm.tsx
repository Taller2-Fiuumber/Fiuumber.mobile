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
// import {Table, TableWrapper, Row, Rows, Col} from 'react-native-table-component';
import { AuthService } from "../services/AuthService";

interface DriverPublicProfileFormProps {
}



export const DriverPublicProfileForm: FC<DriverPublicProfileFormProps> = (): ReactElement => {

    const [labelCommentsAboutDriver, setShowComments] = useState<string>("Show comments about driver");
    const [numberOfComments, setNumberOfComments] = useState<number>(5);

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
  const commentsButtonPressed = () => {
    if(labelCommentsAboutDriver=="Show comments about driver"){
      setShowComments("Hide comments");
      return;
    }
    setShowComments("Show comments about driver");
    setNumberOfComments(5);
  }

  const moreCommentsButtonPressed = () => {
    setNumberOfComments(numberOfComments+5);
  }

  const comments = [
    {comm: "Muy buen viaje! Excelente experiencia"},
    {comm: "La verdad un desastre, casi chocamos, se peleo con un taxista y me echo del auto"},
    {comm: "Me pidio mi whatsapp..."},
    {comm: "mmmmuuuuy buen viaje!! hablamos de cosas interesantes"},
    {comm: "me dejo a dos cuadras del destino y encima me cobro de mas"},
    {comm: "un capooo"},
    {comm: "Me borrare fiuumber por esta experiencia tan desagradable"},
    {comm: "como siempre fiuumber no defrauda, llego rapidisimo y me cobro re barato, me tomaria un fiuumber todos los dias"},
    {comm: "El mejor driver que vi en mi vida."},
    {comm: "pesimo."},
    {comm: "increible."},
  ] // desmockearlo

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
      {(labelCommentsAboutDriver=="Hide comments") && 
        <>
        <Text style={styles.subtitle}>Comments on driver</Text>
        <View style={styles.containerCom}>
        {comments.slice(0,numberOfComments).map((comment) => {
        return (
          <View>
            <Text style={styles.item}>{comment.comm}</Text>
          </View>
        );
      })}
      <Button mode="contained" style={{backgroundColor: Pallete.lightColor, margin: "10%"}}
        onPress={moreCommentsButtonPressed}>
        <Text style={styles.but}>{"Load more"}</Text>
      </Button>
    </View>

        </>
      }
      <Button mode="contained" style={{backgroundColor: Pallete.greenBackground, margin: "0%"}}
        onPress={commentsButtonPressed}>{labelCommentsAboutDriver}
      </Button>

      
    </>
  )
};

export default DriverPublicProfileForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Pallete.whiteColor,
    padding: 20,
  },
  containerCom: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Pallete.whiteColor,
    padding: 15,
    marginBottom: 10
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
  item: {
    padding: 10,
    fontSize: 20,
    marginTop: 5,
    textAlign: 'center',
    backgroundColor: Pallete.lightColor
  },
  but: {
    padding: 10,
    fontSize: 20,
    marginTop: 5,
    textAlign: 'center',
    color: 'black',
    backgroundColor: Pallete.lightColor
  }
});


