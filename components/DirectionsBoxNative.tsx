import React, { FC, ReactElement} from "react";
import { Pallete } from "../constants/Pallete";
import { TextInput, Button } from 'react-native-paper';
import { StyleSheet, View, Text, } from "react-native";
import MapView from 'react-native-maps';
import { GooglePlacesInput } from "./GooglePlacesInput";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
    color: 'red'
  }

});

export const DirectionsBoxNative = (): ReactElement => {

  const [distance, setDistance] = React.useState('');
  const [duration, setDuration] =  React.useState('');
  const [routeNotFound, setRouteNotFound] =  React.useState('');

  return (
  <>
    <View style={styles.container}>
      <GooglePlacesInput placeholder="Origin"></GooglePlacesInput>
      <GooglePlacesInput placeholder="Destination"></GooglePlacesInput>

      <MapView
        style={{width: '100%', height: 200}}
          initialRegion={{
            latitude: -34.6175841,
            longitude: -58.3682286,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
        <Text style={styles.descriptionRoute}>Duration: {duration}</Text>
        <Text style={styles.descriptionRoute}>Distance: {distance}</Text>
        <Text style={styles.errorMessage}>{routeNotFound}</Text>

        <Button mode="contained" style={styles.button} onPress={() => {}}>Search</Button>
    </View>
  </>
  );
};