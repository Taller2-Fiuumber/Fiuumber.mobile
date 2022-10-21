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
import { set, ref } from "firebase/database";
import axios from 'axios';// For API consuming
import { HEADERS } from "../services/Constants";
import { AuthService } from "../services/AuthService";
import { User } from "../models/user";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Pallete.whiteColor,
  },
  map: {
    flex: 1,
    justifyContent: 'center',
    padding: "10%",
    backgroundColor: Pallete.whiteColor,
  },
  descriptionRoute: {
    color: Pallete.darkColor,
    fontSize: 12
  },
  errorMessage: {
    color: "#FF0000",
    fontSize: 12,
    textAlign: "center"
  },
  welcomeText: {
    color: Pallete.darkColor,
    fontWeight: 'bold',
    margin: 10,
    fontSize: 12
  },
  inputText: {
    color: Pallete.darkBackground,
    marginBottom: 14,
    fontSize: 12
  },
  button: {
    color: Pallete.darkBackground,
    margin: 10,
  },
  autocomplete: {
    // marginTop: 100,
    // marginBottom: 0,
    zIndex: 1
  },
  containerInputs: {
    marginTop: 80,
    width: '100%',
    height: 100
  }

});

export const DirectionsBoxNative = (): ReactElement => {

  const [distance, setDistance] = React.useState('');
  const [duration, setDuration] =  React.useState('');
  const [routeNotFound, setRouteNotFound] =  React.useState('');

  const [origin, setOrigin] =  React.useState<any>(null);
  const [destination, setDestination] =  React.useState<any>(null);

  const addTripFirebase = (tripId: string, status: string) => {
    const reference = ref(FirebaseService.db, `trips/${tripId}`);
    set(reference, {
      status: status,
    });
  }

  const startTrip = async () => {
    const user: User | undefined = AuthService.getCurrentUserToken()?.user;

    if (!user) return;
    if (!origin || !destination) return;

    try {
      console.log(user.id.toString())
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
        subscription: "VIP",
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

  return (
  <>
    <View style={styles.container}>
      <View style={styles.containerInputs}>
        <GooglePlacesInput placeholder="Origin" containerStyles={styles.autocomplete} onPress={(data, details = null) => {
        const position = { latitude: details?.geometry.location.lat || 0, longitude: details?.geometry.location.lng || 0};
        setOrigin(position);
      }}></GooglePlacesInput>
        <GooglePlacesInput placeholder="Destination" onPress={(data, details = null) => {
        const position = { latitude: details?.geometry.location.lat || 0, longitude: details?.geometry.location.lng || 0};
        setDestination(position);
      }}></GooglePlacesInput>
      </View>

       <MapView
          style={{marginTop: "10%", width: '100%', height: Dimensions.get('window').height - 500 /* (antes decia 260 en vez de 500!), se habia calculado asi: ALTO PANTALLA - (70 de la barra + 100 de inputs origin y destination + X de duration)*/}}
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
        <Text style={styles.descriptionRoute}>Duration: {duration}</Text>
        <Text style={styles.descriptionRoute}>Distance: {distance}</Text>
        <Text style={styles.errorMessage}>{routeNotFound}</Text>

        <Button mode="contained" style={styles.button} onPress={startTrip}>Get your Fiuumber!</Button>
    </View>
  </>
  );
};