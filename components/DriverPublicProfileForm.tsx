import React, { FC, ReactElement } from "react";

import { TextInput, Button } from 'react-native-paper';
import { useState, useEffect } from "react";
import { Pallete } from "../constants/Pallete";
import {  Pressable, StyleSheet, Text, View} from "react-native";
import { User } from '../models/user';
// import * as dotenv from "dotenv";
import { UserData } from "../models/user_data";
import { Driver } from "../models/driver";
import { DriverVehicle } from "../models/driver_vehicle";
import { Vehicle } from "../models/vehicle";
// import {Table, TableWrapper, Row, Rows, Col} from 'react-native-table-component';
import { AuthService } from "../services/AuthService";
import { TripsService } from "../services/TripsService";
import { Calification } from "../models/trip";
import PassengerHomeScreen from "../screens/PassengerHomeScreen";
import { Navigate } from "react-router";
import navigation from "../navigation";
import {OthersProfileScreen } from '../screens/OtherProfile';
import { NavigationProps } from "../types";

interface DriverPublicProfileFormProps {
  driverId: number;

}

export const DriverPublicProfileForm: FC<DriverPublicProfileFormProps> = ({ driverId }: DriverPublicProfileFormProps, { navigation }: NavigationProps): ReactElement => {
    const [labelCommentsAboutDriver, setShowComments] = useState<string>("Show comments about driver");
    const [numberOfComments, setNumberOfComments] = useState<number>(3);
    // const [califications, setCalifications] = useState({id: "", passengerId: "string", driverId: "", tripId: "", stars: "", comments: "", reviewer: ""});
    const [califications, setCalifications] = useState<Calification[] | null>([]);

    /*------------------------States Initialization----------------------------*/

    // User states
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [calification, setCalification] = useState<number>(0);

    const [trips, setTrips] = useState<number>(0);


    // DriverVehicle states
    const [driver, setDriver] = useState<Driver | undefined>(undefined);

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

  const setDriverValues = (driver: Driver) => {
      setFirstName(driver.firstName)
      setLastName(driver.lastName)
      setDriverVehicleId(driver.vehicle.id)
      setVehicleId(driver.vehicle.vehicle.id)
      setBrand(driver.vehicle.vehicle.brand)
      setModel(driver.vehicle.vehicle.model)
      setImage(driver.vehicle.vehicle.image)
      setDomain(driver.vehicle.domain)
      setModelYear(driver.vehicle.modelYear)
      setColorName(driver.vehicle.colorName)
  }



  useEffect(() => {

    console.log("---------------------entre al console log")
    if(driverId != undefined){
      console.log("---------------------entre al console log del if")
      AuthService.getDriver(driverId).then((a_driver: Driver | null) => {
        console.log("---------------------entre al driver0", a_driver )
        if (a_driver != null) {
          console.log("---------------------entre al driver", a_driver )
          setDriver(a_driver);
          setDriverValues(a_driver);
        }
      }).catch((error) => {
          console.log(error);
      });
    }
    
  }, []);

  useEffect(() => {
   // console.log("---------------------entre al console log")
    if (driver != null) {
      TripsService.getCalificationAverageDriver(driver.userId).then((average: number | null) => {
        if (average != null) {
          setCalification(average)
          console.log("---------------------------getcaliff", average)
        } else {
          setCalification(0)
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }, [driver]);

  useEffect(() => {
    if (driver != null) {
      TripsService.getAmountOfTripsDriver(driver.userId).then((numberOfTrips: number | null) => {
        if (numberOfTrips != null) {
          setTrips(numberOfTrips)
          console.log("---------------------------gettrips", numberOfTrips)
        } else {
          setTrips(0)
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }, [driver]);

  useEffect(() => {
    if (driver != undefined) {
      TripsService.getCalificationsDriver(driver.userId, 0, numberOfComments).then((califications: Calification[] | null) => {
        setCalifications(califications);
        console.log("---------------------------getcaliffDriv", califications)
      }).catch((error) => {
        console.log(error);
      });
    }
  }, [driver]);


  const commentsButtonPressed = () => {
    if(labelCommentsAboutDriver=="Show comments about driver"){
      setShowComments("Hide comments");
      return;
    }
    setShowComments("Show comments about driver");
    setNumberOfComments(3);
  }

  const moreCommentsButtonPressed = () => {
    setNumberOfComments(numberOfComments+3);
  }

  return (
    <>
      {/* <Button mode="contained" style={{backgroundColor: Pallete.greenBackground, margin: "0%"}}
        onPress={() => navigation.navigate('HomeScreen')}>{"Go back"}
      </Button> */}
    
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
      {(labelCommentsAboutDriver=="Hide comments") && (califications!=null) &&
        <>
        <Text style={styles.subtitle}>Comments on driver</Text>
        <View style={styles.containerCom}>
        {califications.slice(0,numberOfComments).map((calification) => {
        return (
          <View>
            <Text style={styles.item}>{calification.comments}</Text>
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
  rowContainer: {
    flexDirection: 'row',
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
  item2: {
    padding: 10,
    fontSize: 20,
    marginTop: 5,
    textAlign: 'center',
    fontWeight: 'bold',
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
