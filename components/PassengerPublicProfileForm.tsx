import React, { FC, ReactElement } from "react";

import { TextInput, Button } from 'react-native-paper';
import { useState, useEffect} from "react";
import { Pallete } from "../constants/Pallete";
import {  StyleSheet, Text, View} from "react-native";
import { User } from '../models/user';

// import * as dotenv from "dotenv";
import { Passenger } from "../models/passenger";
import { Wallet } from "../models/wallet";
import { AuthService } from "../services/AuthService";
import { TripsService } from "../services/TripsService";
import { Calification } from "../models/trip";

interface PassengerPublicProfileFormProps {
}

export const PassengerPublicProfileForm: FC<PassengerPublicProfileFormProps> = (): ReactElement => {
  const [labelCommentsAboutDriver, setShowComments] = useState<string>("Show comments about passenger");
  const [numberOfComments, setNumberOfComments] = useState<number>(5);
  let user = AuthService.getCurrentUserToken()?.user;
  const [califications, setCalifications] = useState<Calification[] | null>([]);

  const [firstName, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [calification, setCalification] = useState<string>("");
  const [created_at, setCreatedAt] = useState<string>("");
  const [trips, setTrips] = useState<string>("");




    AuthService.getCurrentPassenger().then((passenger: Passenger | undefined) => {
      if (passenger != undefined) {
        // passenger values states
        const _userId = user?.id
        setName(passenger.firstName)
        setLastName(passenger.lastName)
        setCalification(passenger.calification)
        setCreatedAt(passenger.createdAt)
        setTrips(passenger.trips)

      }
    }).catch((error) => {
      console.log(error);
    });
   const commentsButtonPressed = () => {
      if(labelCommentsAboutDriver=="Show comments about passenger"){
        setShowComments("Hide comments");
        return;
      }
      setShowComments("Show comments about passenger");
      setNumberOfComments(5);
    }
  
    const moreCommentsButtonPressed = () => {
      setNumberOfComments(numberOfComments+5);
    }

    useEffect(() => {
      TripsService.getCalificationsPassenger(1, 0, numberOfComments).then((califications: Calification[] | null) => {
        setCalifications(califications);
      }).catch((error) => {
        console.log(error);
      });
    }, [califications, numberOfComments]);

  return (
    <>
      <Text style={styles.subtitle}>Passenger Information</Text>

      <TextInput label="First name" style={{marginBottom: 20}} editable={false}
        value={ firstName }
      />

      <TextInput label="Last name" style={{marginBottom: 20}} editable={false}
        value={lastName }
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
      {(labelCommentsAboutDriver=="Hide comments") && (califications!=null)&&
        <>
        <Text style={styles.subtitle}>Comments on passenger</Text>
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

export default PassengerPublicProfileForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Pallete.greenBackground,
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


