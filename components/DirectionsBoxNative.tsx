import React, { FC, ReactElement} from "react";
import { Pallete } from "../constants/Pallete";
import { TextInput, Button } from 'react-native-paper';
import { StyleSheet, View, Text, Dimensions, } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesInput } from "./GooglePlacesInput";
import MapViewDirections from 'react-native-maps-directions';
import { TripsService } from "../services/TripsService";
import { Trip } from "../models/trip";
import { FirebaseService } from "../services/FirebaseService";
import { set, ref, get, onValue, onChildAdded } from "firebase/database";
import axios from 'axios';// For API consuming
import { HEADERS } from "../services/Constants";
import { AuthService } from "../services/AuthService";
import { User } from "../models/user";

const styles = StyleSheet.create({
  mainContainer: {
    position:"relative",
    height: "100%",
    backgroundColor: Pallete.greenBackground,
  },

  containerAutocomplete: {
    position:"relative",
    backgroundColor: Pallete.greenBackground,
    paddingBottom: "10%",
    minWidth: 50,
  },

  containerMap: {
    position:"relative",
    height: "80%",
    backgroundColor: Pallete.greenBackground,
  },

  map: {
    position:"relative",
    height: "80%",
    paddingTop: "5%",
  },
  errorMessage: {
    color: "#FF0000",
    fontSize: 12,
    textAlign: "center"
  },
  inputText: {
    position: 'relative',
    color: Pallete.darkBackground,
    fontSize: 12,
    width: '100%',
    paddingTop: "5%",
    paddingBottom: "5%",
  },

  button: {
    position:"relative",

    color: Pallete.darkBackground,
    marginLeft: "5%",
    marginRight: "5%",
  },

  autocomplete: {
    flex: 1,
    width: '100%',
    paddingTop: "10%",
    paddingBottom: "5%",
  },
  containerInputs: {
    flex: 1,
  }

});

export const DirectionsBoxNative = (): ReactElement => {

  const [distance, setDistance] = React.useState('');
  const [duration, setDuration] =  React.useState('');
  const [routeNotFound, setRouteNotFound] =  React.useState('');

  const [notification, setNotification] =  React.useState<string | null>(null);

  const [origin, setOrigin] =  React.useState<any>(null);
  const [destination, setDestination] =  React.useState<any>(null);

  const addTripFirebase = (tripId: string, status: string) => {
    const reference = ref(FirebaseService.db, `trips/${tripId}`);
    set(reference, {
      status: status,
    });
  }
  const user: User | undefined = AuthService.getCurrentUserToken()?.user;

  const startTrip = async () => {
    

    if (!user) return;
    if (!origin || !destination) return;

    try {
      let trip: Trip | null = {
        _id: "",
        passengerId: user.id.toString(),
        driverId: "",
        fromLatitude: origin.latitude,
        fromLongitude: origin.longitude,
        toLatitude: destination.latitude,
        toLongitude: destination.longitude,
        start: new Date(),// Debería ser autogenerado en la DB
        finish: new Date(),// Debería ser autogenerado en la DB
        subscription: "NORMAL",
        status: "PENDING",
        finalPrice: 0
      };
      trip = await TripsService.create(trip);
      if (trip?._id) addTripFirebase(trip?._id, trip?.status);
    }
    catch(error) {
      console.error(error);
      throw error;
    }
  }

  const watchTrips = () => {
      const reference = ref(FirebaseService.db, `/trips/{tripID}`);
      onChildAdded(reference, snapshot => {
          console.log("NUEVOO", snapshot);
          //setNotification(snapshot.key);
      });
  };

  if (user?.profile === "DRIVER") watchTrips();

  return (
  <>
    <View style={styles.mainContainer}>
      {
        user?.profile === "PASSENGER"  ? (<>
         <View style={styles.containerAutocomplete}>
          <GooglePlacesInput placeholder="Origin" containerStyles={styles.autocomplete} onPress={(data, details = null) => {
            const position = { latitude: details?.geometry.location.lat || 0, longitude: details?.geometry.location.lng || 0};
            setOrigin(position);
          }}></GooglePlacesInput>

          <GooglePlacesInput placeholder="Destination" containerStyles={styles.autocomplete} onPress={(data, details = null) => {
            const position = { latitude: details?.geometry.location.lat || 0, longitude: details?.geometry.location.lng || 0};
            setDestination(position);
          }}></GooglePlacesInput>
        </View>
        </>) : <></>
      }
     {
      notification ? (<><Text>{notification}</Text></>)  : (<></>)
     }

      <View style={styles.containerMap}>
        <View style={styles.map}>
          <MapView
              style={{width: '100%', height: "80%"}}
              initialRegion={{
                latitude: -34.6175841,
                longitude: -58.3682286,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              {destination ? <Marker coordinate={destination} /> : <></>}
              {origin ? <Marker coordinate={origin} /> : <></>}
              {origin && destination ?
                <MapViewDirections
                  origin={origin}
                  destination={destination}
                  apikey="AIzaSyBfs3U9Y_wu6bVrUKC737-Dj_JkWWHGU1I"
                  strokeWidth={5}
                  strokeColor="hotpink"
                />
                : <></>
              }
          </MapView>
        </View>

        <Text style={styles.errorMessage}>{routeNotFound}</Text>
        
        { user?.profile === "PASSENGER" ?
            <Button mode="contained" style={styles.button} onPress={startTrip}>Get your Fiuumber!</Button> : <></>
        }
      </View>

    </View>

  </>
  );
};
