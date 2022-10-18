import React, { FC, ReactElement} from "react";
import { Pallete } from "../constants/Pallete";
import { TextInput, Button } from 'react-native-paper';
import { StyleSheet, View, Text, } from "react-native";
import MapView from 'react-native-maps';
import { GooglePlacesInput } from "./GooglePlacesInput";
import MapViewDirections from 'react-native-maps-directions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Pallete.whiteColor,
    marginTop: 40
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
    height: 200
  }

});

export const DirectionsBoxNative = (): ReactElement => {

  const [distance, setDistance] = React.useState('');
  const [duration, setDuration] =  React.useState('');
  const [routeNotFound, setRouteNotFound] =  React.useState('');

  const [origin, setOrigin] =  React.useState({latitude: 37.3318456, longitude: -122.0296002});
  const [destination, setDestination] =  React.useState({latitude: 37.771707, longitude: -122.4053769});

  // const origin = {latitude: 37.3318456, longitude: -122.0296002};
  // const destination = {latitude: 37.771707, longitude: -122.4053769};

  return (
  <>
    <View style={styles.container}>
      <View style={styles.containerInputs}>
        <GooglePlacesInput placeholder="Origin" containerStyles={styles.autocomplete} onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log({ latitude: details?.geometry.location.lat || 0, longitude: details?.geometry.location.lng || 0});
        setOrigin({ latitude: details?.geometry.location.lat || 0, longitude: details?.geometry.location.lng || 0});
      }}></GooglePlacesInput>
        <GooglePlacesInput placeholder="Destination" onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log({ latitude: details?.geometry.location.lat || 0, longitude: details?.geometry.location.lng || 0});
        setDestination({ latitude: details?.geometry.location.lat || 0, longitude: details?.geometry.location.lng || 0});
      }}></GooglePlacesInput>
      </View>

       <MapView
          style={{width: '100%', height: 200}}
          initialRegion={{
            latitude: -34.6175841,
            longitude: -58.3682286,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey="AIzaSyBfs3U9Y_wu6bVrUKC737-Dj_JkWWHGU1I"
          />
        </MapView>
        <Text style={styles.descriptionRoute}>Duration: {duration}</Text>
        <Text style={styles.descriptionRoute}>Distance: {distance}</Text>
        <Text style={styles.errorMessage}>{routeNotFound}</Text>

        <Button mode="contained" style={styles.button} onPress={() => {}}>Search</Button>
    </View>
  </>
  );
};